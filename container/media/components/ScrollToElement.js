'use client'
import React, { createRef, useRef, useEffect, useState } from 'react';


const MiddleSec = ()=>{
    const [heights, setHeights] = useState([]);
    const [rights, setRights] = useState([]);
    const elementsRef = useRef(data.map(() => createRef()));
  
    useEffect(() => {
      const nextHeights = elementsRef.current.map(
        ref => ref.current.getBoundingClientRect().bottom
      );
      const nextRights = elementsRef.current.map(
        ref => ref.current.getBoundingClientRect().right
      );
      setHeights(nextHeights);
      setRights(nextRights);
    }, []);
    
    const handleClick = () => {
      //elementsRef.current[9]?.scrollIntoView({behavior: 'smooth'});
        window.scrollTo({
          right: 0,
          behavior: 'smooth',
      });
    };

    const refCont = useRef(null);
    const [val, setVal] = useState(0);
    const scrollCont = (scrollOffset) => {
      //refCont.current.scrollTop += scrollOffset;
      refCont.current.scrollTo({ left: scrollOffset, behavior: 
        'smooth' 
      })
    };

    return (
      <div>
        <button style={{padding:'5px', backgroundColor:'red',
          width:'100px', margin:'10px', cursor:'pointer'}}
          onClick={onClickHandler}>
          Press Me
        </button>
        <button style={{padding:'5px', backgroundColor:'red',
          width:'100px', margin:'10px', cursor:'pointer'}}
          onClick={() => scrollCont(rights[val])}>
          Scroll
        </button>
        <input onChange={e=>setVal(e.target.value)}
         val={val} placeholder="scroll to" style={{width:'50px'}}/>
         <label>ScrollTo {val}</label>
        <div style={{height: '200px', backgroundColor:'silver',
          overflowX:'scroll', display:'flex', flexDirection:'row'}}
          ref={refCont}>

          {data.map((item, index) => (
            <div ref={elementsRef.current[index]} key={`${index}+key`}
              className={`item item-${index}`}
              style={{padding:'10px', margin:'5px', backgroundColor:'blue'}}
              //onClick={() => scrollCont()}
              >
              {`${item.text} - right(${rights[index]})`}
            </div>
          ))}
        </div>
      </div>
    );
}


export default MiddleSec


const data = [
  {text: "test1"},{text: "test2"},{text: "test3"},{text: "test4"},
  {text: "test4"},{text: "test6"},{text: "test7"},{text: "test8"},
  {text: "test9"},{text: "test10"},{text: "test11"},{text: "test12"},

];