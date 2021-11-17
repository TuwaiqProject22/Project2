import React, {useState ,useEffect}from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Nav from '../Navbar/Nav';
import "./st.css"

export default function Dispensaries() {
  const [DispensariesArr, setDispensariesArr] = useState([])
  const history = useHistory();
  const [valueInput, setvalueInput] = useState('')

  useEffect(async() => {
    const Dispensaries = await axios.get("http://localhost:5000/Dispensaries")
   setDispensariesArr(Dispensaries.data)
      }, [])
      const goToCard  =(id)=>{
        history.push(`/card/${id}`);
      }
      function setvalue(e) {
        let v = e.target.value;
        setvalueInput(v)
  }
      function serch(e) {
          let newArr = DispensariesArr.filter((item)=>item.name ==valueInput );
          setDispensariesArr(newArr)
  }
    return (
      <>
      <Nav myFunction={serch} fun={ setvalue}/> 

        <div className="container">
        <div className="row">
                   
      {
      DispensariesArr.map((elem, i) => {
        const likefun=async(id)=>{
  
          console.log(id);
      const likes = await axios.post(`http://localhost:5000/like/${id}`)
      setDispensariesArr(likes.data)
      console.log(likes,"llllllllllllllllllllllllllllllll")
        
      }
          return (
     <>
            <div className=" col-md-3  p-2 text-center" key={i} >
            <div  class="polaroid">  
            <div style={{height:"200px"}}>
           <img onClick={()=>{goToCard(elem.id)}} className="w-100 h-100" src={elem.img} alt="mj"style={{width:"100px"}} /></div>
           <div class="container">
           <p>{elem.name} </p>
           {  DispensariesArr[i].key === true ?  <button  onClick={()=>{likefun(elem.id)}}> 🧡</button> :  <button  onClick={()=>{likefun(elem.id)}}> 💔</button>}

            </div>
            </div>
            </div>
            </>
          );}
        )}
   </div>
   </div>
   </>
 )}