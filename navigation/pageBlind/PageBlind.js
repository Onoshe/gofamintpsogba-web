'use client';


const PageBlind = ({children, showBlind, top, bg, contStyle, childStyle}) => {

  return (
    <div className={`${showBlind? '' :'hidden'} ${top || 'top-[60px]'} ${bg || 'bg-black/30'} z-50 fixed bottom-0 left-0 right-0 w-full  ${contStyle}`}>
        <div className={`${childStyle} ${showBlind? 'animate-slideIn-from-top': ''}`}>
            {children}
        </div>
    </div>
  )
}

export default PageBlind