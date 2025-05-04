import React, { useState, useEffect } from 'react';
const Heading = () => {
    const [size , setsize] = useState(20)
 const increasesize = (e)=>{
    e.preventDefault();
    setsize(size + 10);

 }

 const decreasesize = ()=>{
    setsize(size-10)
   }

  return (
    <div className='heading'>
        <div style={{backgroundColor:'blue'}}>
       <h1 style={{fontSize:`${size}px`}}>
        heading hai ye okay 
        </h1> 

        </div>
        <button onClick={increasesize}> +</button>
        <button onClick={decreasesize}>-</button>

    </div>
  );
};

export default Heading; 