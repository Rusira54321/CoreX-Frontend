import React, { useEffect, useState } from 'react'
import {watchdatas} from "./watchdata"
import { useParams } from 'react-router-dom'
const Watch = () => {
  const {id} = useParams()
  const [watchdata,setwatchdata] = useState({})
  useEffect(()=>{
      watchdatas.map((watch)=>{
        if(watch.id==id)
        {
          setwatchdata(watch)
        }
      })
  },[])
  return (
    <div className="px-2 sm:px-4 md:px-0">
      <div className='flex flex-col md:flex-row md:items-center md:justify-center w-full mt-6 md:mt-20 gap-6'>
        <div className='flex mx-auto md:mx-0 w-[300px] h-[220px] sm:w-[320px] sm:h-[220px] md:w-[350px] md:h-[250px] lg:w-[450px] lg:h-[320px]'>
          <img src={watchdata.image} alt={watchdata.name} className='w-full h-full object-cover rounded-lg shadow-lg' />
        </div>
        <div className='md:w-[300px] mt-6 md:mt-0 px-2 md:px-0'>
              <h1 className='text-3xl text-gray-700 from-neutral-500'>{watchdata.name}</h1>
              <h1 className='text-lg mt-5 text-blue-500'>Rs.{watchdata.price}</h1>
              <p className='text-sm mt-2 text-gray-400'>{watchdata.description}</p>
              
        </div>
      </div>
    </div>
  )
}

export default Watch
