'use client'
import React from 'react'


const Dashboard = ({signOut, user}) => {
  return (
    <div className='w-full bg-red-100  h-screen'>
       <div className='p-5'>
        <div className='w-full flex justify-end'>
              <div className='flex flex-col'>
                <p className='text-left text-green-700'>{user?.email}</p>
                <p className='text-left text-green-700'>{user?.phoneNo}</p>
                <button className='px-7 py-4 btn btn-warning'
                  onClick={()=>signOut()}>
                    Logout
                </button>
              </div>
        </div>
       </div>
    </div>
  )
}

export default Dashboard