import { BsFileEarmarkPdf } from "react-icons/bs";



const TooltipCustomised = ({textmain, texthover, hovertext}) => {
    return (
      <div className="flex relative flex-wrap text-lg sm:text-2xl sm:text-left p-[0] py-5 md:px-10">
          <h1>{textmain}</h1> 
          <span className="peer cursor-pointer text-blue-900 pl-3 hover:text-[mediumblue]">{texthover}</span>
          <h1 className="hidden mt-2 peer-hover:block  absolute bottom-12  duration-100">
            <span className="float-rightss w-fit flex justify-center text-white p-2 rounded-lg text-[12px] smc:text-[14px] md:text-[16px]  bg-[#310252]">
              {hovertext}
            </span> 
          </h1>
      </div>

    )
  }

  
  const TooltipCustom2 = ({texthover, hovertext}) => {
    return (
      <div className="flex flex-row flex-1 relative">
         <BsFileEarmarkPdf size={24} color="red"
                />
          <span className="peer cursor-pointer text-blue-900 pl-3 hover:text-[mediumblue]">
            {texthover}
          </span>
          <h1 className="hidden w-full mt-0 peer-hover:block  absolute bottom-7  duration-100">
            <span className="float-rightss w-fit flex justify-center text-white p-2 rounded-lg text-[12px] smc:text-[14px] md:text-[16px]  bg-[#310252]">
              {hovertext}
            </span> 
          </h1>
      </div>

    )
  }
 
  export {TooltipCustomised, TooltipCustom2};
  