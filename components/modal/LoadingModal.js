


const LoadingModal = ({loadingMsg, showBlind}) => {
    

  return (
    <div className={`fixed right-0 left-0 bottom-0 top-0 z-50 w-full flex items-center justify-center bg-[#2c3d48]/95 px-4 ${showBlind? '' :'hidden'}`}>
            <div className={`relative  flex flex-col rounded-md pb-3 pt-6 px-4 min-w-[250px] max-w-[450px]`}>
           
                <div className={`mt-5 flex justify-center items-center flex-col`}>
                    <span className='loading loading-spinner text-info size-12'></span>
                    <p className='text-white'>{loadingMsg || "Loading, please wait...."}</p>
                </div>
            </div>
    </div>
  )
}

export default LoadingModal