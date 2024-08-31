import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import SeeUserData from './SeeUserData';
import { IoOpenOutline } from "react-icons/io5";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState()
  const [Options, setOptions] = useState(-1)
  const [Values, setValues] = useState({status:""})
  const [userDiv, setuserDiv] = useState("hidden")
  const [userDivData, setuserDivData] = useState()  
  const headers = {  
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
  useEffect(() => { 
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-all-orders",{headers}
      );
      setAllOrders(response.data.data);
    }
    fetch();
   }, [AllOrders])

  const change = (e)=>{
    const {value} = e.target;
    setValues({status: value})
  };
   
  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `http://localhost:1000/api/v1/update-status/${id}`,
      Values,
      {headers}
    )
    alert(response.data.message);
  }
  
  AllOrders && AllOrders.splice(AllOrders.length - 1, 1)
  return (
    <>
      {!AllOrders && (
        <div className='h-[100%] flex items-center justify-center '>
          <Loader/>
        </div>
      )}
      {AllOrders && AllOrders.length === 0 && (
        <div className='text-5xl h-[100%] font-semibold text-zinc-500 flex items-center justify-center flex-col w-full'>
          No Orders Yet
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
          <div className='h-[50vh] lg:h-[100%] p-0 md:p-4 text-zinc-100'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 mt-4 '>
              All Orders
            </h1>
            <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
              <div className='w-[3%]'>
                <h1 className='text-center'>Sr.</h1>
              </div>
              <div className='w-[22%]'>
                <h1 className=''>Books</h1>
              </div>
              <div className='w-[45%] '>
                <h1 className=''>Description</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className=''>Price</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className=''>Status</h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className=''>
                  <FaUserLarge/>
                </h1>
              </div>
            </div>
            {AllOrders.map((items,i)=> (
              <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'>
                <div className='w-[3%] '>
                  <h1 className='text-center'>{i+1}</h1>
                </div>
                <div className='w-[40%] md:w-[22%]'>
                  <Link 
                  to={`/view-book-details/${items.book._id}`}
                  className='hover:text-blue-300'>
                    {items.book.title}
                  </Link>
                </div>
                <div className='w-0 md:w-[45%] hidden md:block'>
                  <h1 className=''>{items.book.desc.slice(0,50)} ...</h1>
                </div>
                <div className='w-[17%] md:w-[9%] '>
                  <h1 className=''>&#8377; {items.book.price}</h1>
                </div>
                <div className='w-[30%] md:w-[16%]'>
                  <h1 className='font-semibold text-zinc-800'>
                    <button className='hover:scale-105 transition-all duration-300'
                    onClick={()=>setOptions(i)}>
                      {items.status === "Order placed" ? (
                        <div className='text-yellow-500'>{items.status}</div>
                      ) : items.status ==="Canceled" ? (
                        <div className='text-red-500'>{items.status}</div>
                      ) : (
                        <div className='text-green-500'>{items.status}</div>
                      )}
                    </button>
                    <div className={`${Options === i ? "block" : "hidden"} flex mt-4`}>
                      <select name="status" id="" className='bg-grey-800'
                      onChange={change}
                      value={Values.status}>
                        {[
                          "Order placed",
                          "Out for delivery",
                          "Delivered",
                          "Canceled",
                        ].map((items,i) => (
                          <option value={items} key={i}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button className='text-green-500 hover:text-pink-600 mx-2'
                      onClick={()=>{
                        setOptions(-1);
                        submitChanges(i);
                      }}>
                        <FaCheck/>
                      </button>
                    </div>
                  </h1>
                </div>
                <div className='w-[10%] md:w-[5%]'>
                  <button className='text-xl hover:text-orange-500'
                  onClick={()=>{
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}>
                    <IoOpenOutline/>
                  </button>
                </div>
              </div>
            ))}
          </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  )
}

export default AllOrders