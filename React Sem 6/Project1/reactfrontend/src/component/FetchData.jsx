import { useState } from 'react'

function FetchData() {
  const[data,setData]=useState([]);
  const[loader,setLoader]=useState(false)
async function getData(){

  try{
    setLoader(true)
    // Previous connection code commented
    // const response=await fetch('http://localhost:4007/data');
    // const jsondata=await response.json();
    // setData(jsondata.msg);

    // New connection code
    const response = await fetch('http://localhost:4007/students');
    const jsondata = await response.json();
    setData([jsondata.msg]); // Since students is an object, wrap in array or adjust
  }catch(e){
    console.log(e)
  }
  finally{
     setLoader(false)
  }

  
}

function cartData(dataitem){
alert(dataitem.title)
}
  return (
    <>
      <h2>Welcome to React App</h2>
      {data.length > 0 ? (
        data.map((ele, index) => (
          <div key={index} style={{border:'2px solid red', margin: '10px', padding: '10px'}}>
            <h2>{ele.name}</h2>
            <h3>Branch: {ele.Branch}</h3>
            <h3>College: {ele.College}</h3>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
      {loader ? (<h2 style={{color:'red'}}>Data is loading...</h2>) : ("")}
      <button onClick={getData}>Fetch Students Data</button>
    </>
  )
}




export default FetchData