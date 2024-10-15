


export const Modal = () => {
    
  return (
    <div className='z-50 fixed top-0 bottom-0 right-0 w-full h-screen bg-[#33486ea7] px-4 flex justify-center items-center'>
        <div className='relative bg-white boder border-blue-500 p-3 rounded-md w-full max-w-[350px]'>
        
            <p className='text-center font-bold py-3 text-red-800'>Signing Out</p>
            <div className='flex flex-row justify-center items-center gap-3 p-4 text-sm text-center'>
            <span className="loading loading-spinner text-error mr-6"></span> <p>Please wait....</p>
            </div>
        </div>
    </div>
  )
}
