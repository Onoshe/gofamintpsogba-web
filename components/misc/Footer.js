import React from 'react'

const Footer = ({styleVisit, styleSite}) => {
  return (
    <footer className='mt-8'>
        <div className={`text-center mx-3 text-[14px] sm:text-[18px] font-bold h-fit py-3 px-6`} 
            >
            <p className={`text-base md:text-xl py-3 ${styleVisit || 'text-[teal]'}`}>Visit our official website for more info</p>
            <a href='https://gofamintpsogba.org' 
              className={`${styleSite || 'text-[blue]'} text-base md:text-2xl hover:text-blue-700 px-2 py-[1px] hover:underline cursor-pointer`}>
            www.gofamintpsogba.org
            </a>
        </div>
    </footer>
  )
}

export default Footer