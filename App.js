import React,{useState} from "react";
import { Main,InternPage,Head } from "./pages";

const App = () =>  {

    const [number,setNumber] = useState(0)

    const getData = (number) => setNumber(number)
  


  return(

   

    <div style={{
      width: '100%',
      padding: ' 0px 0px 0px 0px',
      backgroundColor:"rgb(238,238,248)"}}
    >
      <Head
        number={number}
      />
      
      <Main 
        style={{borderRadius:'20px'}}
        getData={getData} 
        number ={number}
        />
    </div>



  )




}

export default App;