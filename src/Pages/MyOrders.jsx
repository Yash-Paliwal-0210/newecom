import React from 'react'
import Navbar from '../Components/Navbar'

const MyOrders = () => {
  return (
    <>
    <Navbar/>
    <div>
      <div className=''> 
            <div className='text-3xl font-bold text-center mt-10'>Users name Table</div>
            <div class="w-full shadow-md sm:rounded-lg mt-4">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
              <th scope="col" class="px-6 py-3">
                  Order Id
              </th>
              <th scope="col" class="px-6 py-3">
                  Status
              </th>
              <th scope="col" class="px-6 py-3">
                  Items Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                  Amount
              </th>
              <th scope="col" class="px-6 py-3">
                  Actions
              </th>
              
          </tr>
      </thead>
      <tbody>
     

        
          
          
         
    
      </tbody>
  </table>
</div>
      </div>
    </div>
    </>
  )
}

export default MyOrders
