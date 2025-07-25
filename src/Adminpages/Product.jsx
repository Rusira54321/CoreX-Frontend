import React from 'react'
import { useNavigate } from 'react-router-dom'

const Product = () => {
  const navigate = useNavigate()
  return (
    <div>
        <div className='flex mt-20 lg:mt-10 mx-auto justify-center lg:mr-65 md:mr-65  md:mt-10'>
                <div onClick={()=>navigate('/admin/addProduct')} className='flex justify-center items-center w-[150px] h-[30px] bg-blue-600 text-white px-2 hover:bg-blue-700 cursor-pointer'>
                    Add Products
                </div>

        </div>
    </div>
  )
}

export default Product
