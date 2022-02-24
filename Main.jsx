import React,{useRef, useState,useMemo} from "react"
import { makeStyles } from "@material-ui/core/styles"
import { ButtonMui,SelectBoxMui,InputBox,AlertMui } from '../components'
import {Box} from "@material-ui/core/"
import { propsToClassKey } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    root : {
        width: '100%',
        padding: 20
    },
    headerRoot: {
        width: '50%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor:"white",
        borderRadius:'20px 20px 0px 0px'
    },
    listRoot:{
        margin:'0px 0px 0px 0px',
        width: '50%',
        display:'flex',
        justifyContent:'space-between',
        backgroundColor:"white",
        padding: '20px 0px 0px -20px'
    },
    buttonList:{
        display:'flex',
        justifyContent:'flex-start',
        margin: "10px 25px 10px 10px",

    },
    header:{
        margin:'20px',
        backgroundColor: 'white',
        display:'flex',
        
    },
    buttonHeader:{
        margin:'0px 20px 0px 0px',
        
    },
    listComponent:{
        padding: '0px 0px 0px 20px',
        textAlign: 'left',
    },
    
}))


const Main = ({getData, number}) => {

    const tag = useMemo(() => {
        return ["Work","Home","Like"]
    }, []);

    

    const classes = useStyles();

    const [inputValue,setInputValue] = useState("");    
    const [todoList,setTodoList] = useState([]);
    const [selectTag,setSelectTag] = useState(tag[0]);
    const [editCheck,setEditCheck] = useState(true);   //변경 버튼 클릭 시 값을 반대로 하여 Add와 Edit으로 구분
    const [willChange,setWillChange] = useState();
    
   

    const handleAdd = () => {
      
        const copy = [...todoList]
        copy.push([inputValue, selectTag])
        console.log(selectTag)
        setTodoList(copy)
        
        const textbox = {
            inText: inputValue,
            inText2: selectTag
          };
          fetch("http://localhost:3004/text", {
            method: "post", //통신방법
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(textbox),
          })
            .then((res) => res.json())
            .then((json) => {
              console.log(json.selectTag);
              setSelectTag(json.selectTag);
              setInputValue(json.inputValue);
              /* this.setState({
                text: json.text,
              }); */
            });
        

            setInputValue("")
            getData(number+1)
    }

    const handleChange = (e) => {
        setInputValue(e)
    }
    const handleSelect = (e) => {
        console.log("Hi",e)
        setSelectTag(e)
    }

    const handleDelete = (index) => {
        const copyList = [...todoList]
        copyList.splice(index, 1);
        setTodoList(copyList)
        getData(number-1)
    }
    const handleEdit = (item,index) => {

            //값 변경 
            //현재 상태:추가 버튼 true
         /*    // console.log(typeof index)
            // console.log(index) */
            setWillChange(index)
            setWillChange(index) // 바꿀 list의 index를 가져옴
            setInputValue(item[0]) // 값을 불러옴
            setSelectTag(item[1]) // Select 값을 불러옴 (구현아직X)

            if (editCheck) setEditCheck(!editCheck)
         }

        const ChangeList = () => {
            const copy = [...todoList]
            copy.forEach((item,num) => {
                if (num === willChange){
                    item[0] = inputValue
                    item[1] = selectTag
                }
            })
            setTodoList(copy)
         
            

            setEditCheck(!editCheck)
            setInputValue("")
        

        }
        
        
    return (
        <div className={classes.root}>
            <div className={classes.headerRoot}>
                <Box className={classes.header}>
                <SelectBoxMui // 드롭다운형식의 SelectBox
                    name="Tag"
                    arr = {tag}
                    onChange = {handleSelect}
                    styles={{margin:'20px'}}
                    className= {classes.header}
                    value={selectTag}
                />
                </Box>
                <Box className={classes.header}>
                <InputBox  //사용자의 키보드 입력 값을 받는 InputBox
                    
                    placeholder="Write your TodoList!"
                    value={inputValue}
                    onChange={handleChange}
                    className={classes.header}
                />
                </Box>
                <Box className={classes.header}>
                    {editCheck ? 
                    <div className={classes.buttonHeader}>
                    <ButtonMui //클릭 시 받은 데이터를 todoList에 저장하는 버튼
                        name="추가"
                        onClick={() => {
                            if (inputValue === "") {alert("Please write your task!")}
                            else {handleAdd()}
                        }}
                    />
                    </div>
                :
                    <div className={classes.buttonHeader}>
                    <ButtonMui
                    name="변경"
                    onClick={() => {
                        if (inputValue === "") {alert("Please write your task!")}
                        else ChangeList()}}
                    /> 
                    </div>
                    }
                    
                    <div>
                    <ButtonMui
                        name="취소"
                        onClick ={() => {
                            if (editCheck === false) {
                            setEditCheck(!editCheck)
                            setInputValue("")
                        }
                            else {
                            setInputValue("")
                            }
                        }}
                        
                    /> 
                    </div> 
                </Box>
            </div>                            {
                todoList && todoList.length > 0 ? 
                    <div >
                        {
                            todoList.map((list,index) => {
                                return(
                                    <div 
                                    key={index}
                                    className={classes.listRoot}>
                                        <div
                                        className={classes.listComponent}
                                        >
                                            {list[1]}
                                        </div>
                                        <div 
                                        className={classes.listComponent}>
                                            {list[0]}
                                        </div>
                                        <div className={classes.buttonList}>
                                        <div >
                                        <ButtonMui
                                            
                                            name="편집"
                                            onClick={() => handleEdit(list,index)}
                                        />
                                        </div>
                                        <div>
                                        <ButtonMui //클릭 시 todoList의 해당 인덱스값의 데이터 및 행을 삭제하는 버튼
                                            name="삭제"
                                            onClick={() => handleDelete(index)}
                                        />
                                        </div>
                                        </div>
                                    </div>


                                )
                            }) 
                        }
                    </div> 
                :null
            }
        </div>

    )
}




export default Main;