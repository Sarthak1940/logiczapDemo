import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import ProfileEdit from '../../../modals/recruiter/dashboard/ProfileEdit'

export default function Profile() {
    const [openEdit,setOpenEdit]=useState(false)
  return (
    <div className='p-3 flex flex-col gap-3 max-md:gap-1 bg-white rounded-[32px] pb-20'>
       <div className='flex justify-between items-center text-[#18273A] gap-1 p-5 max-sm:flex-col '>
                <div className='flex items-center gap-3'>
                    <Avatar className='!w-[100px] !h-[100px] max-md:!w-[60px] max-md:!h-[60px]' src=''/>
                    <div>
                        <div className='leading-6 font-[500] text-2xl max-sm:text-md'>Asril ibrahim</div>
                        <div className='leading-6 text-sm max-sm:text-xs'>asril.ibrahim@rocketmail.com</div>
                    </div>
                </div>
                <button onClick={()=>setOpenEdit(true)} className='bg-[#5271FF] px-10 py-1 text-white rounded-lg text-xl max-sm:text-sm'>Edit</button>
        </div>

        <div className='flex gap-10 px-2 mb-3 max-md:flex-col max-md:gap-2 max-md:text-sm'>
            <div className='flex-1'><div  className='mb-2 '>Full Name</div><div className='flex-1 border bg-[#F9F9F9] p-3 rounded-lg text-[gray] text-md'>Your Name</div></div>
            <div className='flex-1'><div className='mb-2 '>User Name</div><div className='flex-1 border bg-[#F9F9F9] p-3 rounded-lg text-[gray] text-md'>Your Name</div></div>
            
        </div>
        <div className='flex gap-10 px-2 mb-3 max-md:flex-col max-md:gap-3 max-md:text-sm'>
            <div className='flex-1'><div  className='mb-2 '>Company Name</div><div className='flex-1 border bg-[#F9F9F9] p-3 rounded-lg text-[gray] text-md'>Your Name</div></div>
            <div className='flex-1'><div className='mb-2 '>Designation</div><div className='flex-1 border bg-[#F9F9F9] p-3 rounded-lg text-[gray] text-md'>Your Name</div></div>
            
        </div>
        

        <div className=''>
            <div className='text-lg font-[500] mb-3 max-md:text-sm'>Company Email Address</div> 
            <div className='flex items-center gap-3 mb-3'>
                    <span className='p-3 rounded-full bg-[#ECF3FF]'><svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5639 3.68472H7.20277C4.39444 3.68472 2.52222 5.08889 2.52222 8.36528V14.9181C2.52222 18.1944 4.39444 19.5986 7.20277 19.5986H16.5639C19.3722 19.5986 21.2444 18.1944 21.2444 14.9181V8.36528C21.2444 5.08889 19.3722 3.68472 16.5639 3.68472ZM17.0039 9.38564L14.0738 11.7259C13.456 12.2221 12.6697 12.4654 11.8833 12.4654C11.097 12.4654 10.3013 12.2221 9.69283 11.7259L6.7628 9.38564C6.46324 9.14225 6.41644 8.69292 6.65047 8.39336C6.89386 8.09381 7.33383 8.03764 7.63338 8.28103L10.5634 10.6213C11.2749 11.1923 12.4824 11.1923 13.1939 10.6213L16.1239 8.28103C16.4235 8.03764 16.8728 8.08444 17.1068 8.39336C17.3502 8.69292 17.3034 9.14225 17.0039 9.38564Z" fill="#4182F9"/>
</svg>
</span>
                   
            <div className='leading-6 font-[500] text-xl'>Asril ibrahim</div>
                      
                  
                </div>
        </div>
        {/* <button className='bg-[#ECF3FF] py-2 rounded-lg  w-[300px] text-[#4182F9] max-md:text-sm'>Change Email Address</button> */}
        <ProfileEdit open={openEdit} setOpen={setOpenEdit}/>
    </div>
  )
}
