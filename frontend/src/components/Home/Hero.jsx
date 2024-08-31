import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-full lg:h-[75vh] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full  mb-12 md:mb-0 lg:w-3/6 flex flex-col lg:items-start justify-center'>
            <h1 className='text-4xl lg:text-7xl font-semibold text-yellow-100 text-center lg:text-left'>
                Discover Your Next Great Read
            </h1>
            <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
            Unlock the magic of storytelling with your next great read! Dive into a world of adventure, romance, 
            and mystery, curated just for you. Discover books that captivate, inspire, and transport you to new realms.
            </p>
            <div className='mt-8'>
            <Link 
                to="/all-books" 
                className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 mt-5 px-10 py-3 ml-8 hover:bg-zinc-800 rounded-full'>
                    Discover Books
            </Link>
            </div>
        </div>
        <div className='w-full lg:w-3/6 flex items-center justify-center'>
            <img src="https://images.unsplash.com/photo-1568667256549-094345857637?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D" alt="hero" />
        </div> 
    </div>
  )
}

export default Hero