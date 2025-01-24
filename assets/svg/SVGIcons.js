import React,  { useState } from "react";


const Zoom =({onClick})=>{
    const size = 62;
    const [circleColor, setCircleColor] = useState("#2196f3");
    const [pathColor, setPathColor] = useState("#fff");
    const [borderColor, setBorderColor] = useState("#2196f3");

    function mouseEnterHandler(){
        setCircleColor("white");
        setPathColor("mediumblue");
        setBorderColor("mediumblue");
    }
    function mouseLeaveHandler(){
        setCircleColor("#2196f3");
        setPathColor("#fff");
        setBorderColor("#2196f3");
    }

    return(
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" className="c-zoom-cont"
                width={size? size+"px" : "48px"} height={size?  size+"px" : "48px"}
                onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}
                onClick={onClick}>
            <circle cx="24" cy="24" r="21" fill={borderColor}/>
            <circle cx="24" cy="24" r="20" fill={circleColor}/>
            
            <path fill={pathColor} d="M29,31H14c-1.657,0-3-1.343-3-3V17h15c1.657,0,3,1.343,3,3V31z"/>
            <polygon fill={pathColor} points="37,31 31,27 31,21 37,17"/>
        </svg>
    )
}


const ZoomCustomize =({color, bColor,})=>{
    const size = 58;

    return(
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" className="cursor-pointer"
                width={size? size+"px" : "48px"} height={size?  size+"px" : "48px"}>
            <circle cx="24" cy="24" r="20" fill={bColor? bColor : "#2196f3"}/>
            <path fill={color? color : "#fff"} d="M29,31H14c-1.657,0-3-1.343-3-3V17h15c1.657,0,3,1.343,3,3V31z"/>
            <polygon fill={color? color : "#fff"} points="37,31 31,27 31,21 37,17"/>
        </svg>
    )
}

const MxrlRadio =()=>{

    return(
      <div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAASBJREFUOE/dkj8vBGEQh3+/2VzsXiMcybFbXLj1CUgkEkdHIVeIRLhrNQpfQCEhp1DjI5yIP1+BQqUkFJbirES4QzRC4h3ZTVQ0m+3u7ebNzDMzT4ZI+ZiyHu0CeM0XCs5Wbc7Q1LOVSpjEC1/6izOkdtPtyzsryzaMXnZUFw6fveJEbxicRLCW589C9DrXCK6i+MkbnBZqs+f+7pxN118VUd8aH7v9Pj2bzG5u7NvV+d0IQGCKiowCNoEvEG/xdIYNCEYBXfoDsEaGDzqP97YjgBBlKFwFHwltEQgArKlhTcUsArITr2CEGYH6UScBL7rCm6MI8OtCgBIBR4GP+I9qVFGywPX4Dt7dgaFPsizKeu4hSCYxifH/ctvlEtN4+AHxU2Eq2W2m9wAAAABJRU5ErkJggg==" alt="mirl"
            width={50} height={50}/>
      </div>
    );
};

const GoogleMap =({color, bColor,})=>{
    const size = 58;

    return(
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" 
            className="hover:rounded-full bg-[''] hover:bg-[blue] hover:border-solid hover:border-[white] hover:border-2"
            width={size? size+"px" : "48px"} height={size?  size+"px" : "48px"}>
            <path fill="#48b564" d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"/>
            <path fill="#fcc60e" d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"/>
            <path fill="#2c85eb" d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"/>
            <path fill="#ed5748" d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"/>
            <path fill="#5695f6" d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"/>
        </svg>
    )
}


const Instagram =()=>{
   const [color, setColor] = useState('#fff');


    return(
        <svg xmlns="http://www.w3.org/2000/svg" 
        height="80" width="80" 
        viewBox="-19.5036 -32.49725 169.0312 194.9835"
         onMouseEnter={()=>setColor("mediumblue")}
         onMouseLeave={()=>setColor("#fff")}>
        <defs>
            <radialGradient fy="578.088" fx="158.429"
                 gradientTransform="matrix(0 -1.98198 1.8439 0 -1031.399 454.004)" 
                 gradientUnits="userSpaceOnUse" 
                 href="#a" r="65" cy="578.088" cx="158.429" id="c"/>
            <radialGradient fy="473.455" fx="147.694" 
                gradientTransform="matrix(.17394 .86872 -3.5818 .71718 1648.351 -458.493)" 
                gradientUnits="userSpaceOnUse" 
                href="#b" r="65" cy="473.455" cx="147.694" id="d"/>
            <linearGradient id="b">
                <stop stopColor="#3771c8" offset="0"/>
                <stop offset=".128" stopColor="#3771c8"/>
                <stop stopOpacity="0" stopColor="#60f" offset="1"/>
            </linearGradient>
            <linearGradient id="a">
                <stop stopColor="#fd5" offset="0"/>
                <stop stopColor="#fd5" offset=".1"/>
                <stop stopColor="#ff543e" offset=".5"/>
                <stop stopColor="#c837ab" offset="1"/>
            </linearGradient>
        </defs>
            <path d="M65.033 0C37.891 0 29.953.028 28.41.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468-4.125 4.282-6.625 9.55-7.53 15.812-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28a27.22 27.22 0 0017.75-14.53c1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624-4.3-4.108-9.56-6.608-15.829-7.512C102.338.157 101.733.027 86.193 0z" 
                fill="url(#c)"/>
            <path d="M65.033 0C37.891 0 29.953.028 28.41.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468-4.125 4.282-6.625 9.55-7.53 15.812-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28a27.22 27.22 0 0017.75-14.53c1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624-4.3-4.108-9.56-6.608-15.829-7.512C102.338.157 101.733.027 86.193 0z" 
                fill="url(#d)"/>
            <path d="M65.003 17c-13.036 0-14.672.057-19.792.29-5.11.234-8.598 1.043-11.65 2.23-3.157 1.226-5.835 2.866-8.503 5.535-2.67 2.668-4.31 5.346-5.54 8.502-1.19 3.053-2 6.542-2.23 11.65C17.06 50.327 17 51.964 17 65s.058 14.667.29 19.787c.235 5.11 1.044 8.598 2.23 11.65 1.227 3.157 2.867 5.835 5.536 8.503 2.667 2.67 5.345 4.314 8.5 5.54 3.054 1.187 6.543 1.996 11.652 2.23 5.12.233 6.755.29 19.79.29 13.037 0 14.668-.057 19.788-.29 5.11-.234 8.602-1.043 11.656-2.23 3.156-1.226 5.83-2.87 8.497-5.54 2.67-2.668 4.31-5.346 5.54-8.502 1.18-3.053 1.99-6.542 2.23-11.65.23-5.12.29-6.752.29-19.788 0-13.036-.06-14.672-.29-19.792-.24-5.11-1.05-8.598-2.23-11.65-1.23-3.157-2.87-5.835-5.54-8.503-2.67-2.67-5.34-4.31-8.5-5.535-3.06-1.187-6.55-1.996-11.66-2.23-5.12-.233-6.75-.29-19.79-.29zm-4.306 8.65c1.278-.002 2.704 0 4.306 0 12.816 0 14.335.046 19.396.276 4.68.214 7.22.996 8.912 1.653 2.24.87 3.837 1.91 5.516 3.59 1.68 1.68 2.72 3.28 3.592 5.52.657 1.69 1.44 4.23 1.653 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.214 4.68-.996 7.22-1.653 8.91-.87 2.24-1.912 3.835-3.592 5.514-1.68 1.68-3.275 2.72-5.516 3.59-1.69.66-4.232 1.44-8.912 1.654-5.06.23-6.58.28-19.396.28-12.817 0-14.336-.05-19.396-.28-4.68-.216-7.22-.998-8.913-1.655-2.24-.87-3.84-1.91-5.52-3.59-1.68-1.68-2.72-3.276-3.592-5.517-.657-1.69-1.44-4.23-1.653-8.91-.23-5.06-.276-6.58-.276-19.398s.046-14.33.276-19.39c.214-4.68.996-7.22 1.653-8.912.87-2.24 1.912-3.84 3.592-5.52 1.68-1.68 3.28-2.72 5.52-3.592 1.692-.66 4.233-1.44 8.913-1.655 4.428-.2 6.144-.26 15.09-.27zm29.928 7.97a5.76 5.76 0 105.76 5.758c0-3.18-2.58-5.76-5.76-5.76zm-25.622 6.73c-13.613 0-24.65 11.037-24.65 24.65 0 13.613 11.037 24.645 24.65 24.645C78.616 89.645 89.65 78.613 89.65 65S78.615 40.35 65.002 40.35zm0 8.65c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16z" 
                fill={color}/>
    </svg> 
    );
}

export { Zoom, ZoomCustomize, MxrlRadio, GoogleMap, Instagram };

