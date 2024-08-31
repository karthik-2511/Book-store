import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

const Favorites = () => {
  const [FavoriteBooks, setFavoriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favorite-books",
        {headers});
      setFavoriteBooks(response.data.data);
    }
    fetch();
  }, [FavoriteBooks])
  
  return (
    <>
      {FavoriteBooks && FavoriteBooks.length === 0 && (
        <div className='mt-4 flex flex-col items-center justify-center'>
          <div className='text-5xl lg:h-[100%] font-semibold text-zinc-500 flex items-center justify-center flex-col w-full'>
            No Favorite Books
          </div>
          <img src="https://img.freepik.com/premium-photo/open-book-with-glowing-bookmark-that-says-magic_900396-28320.jpg" alt="" 
          className='h-[25vh] lg:h-[30vh] rounded-xl mt-4'/>
        </div>
        
      )};
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {FavoriteBooks && FavoriteBooks.map((items,i) => (
        <div key={i}>
          <BookCard data={items} favorite={true} />
        </div>
        ))}
      </div>
    </>
    
  )
}

export default Favorites