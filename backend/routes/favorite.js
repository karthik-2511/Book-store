const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//add book to favorite
router.put("/add-book-to-favorite",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite = userData.favorites.includes(bookid); 
        if(isBookFavorite){
            return res.status(200).json({message:"Book already in favorite"});

        }   
        await User.findByIdAndUpdate(id,{ $push :{ favorites: bookid } }); 
        return res.status(200).json({message:"Book added to favorites"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});

//remove book from favorites
router.put("/remove-book-from-favorite",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite = userData.favorites.includes(bookid); 
        if(isBookFavorite){
            await User.findByIdAndUpdate(id,{ $pull :{ favorites: bookid } }); 

        }     
        return res.status(200).json({message:"Book removed from favorites"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});

//get favorite books of a particular user
router.get("/get-favorite-books",authenticateToken,async(req,res) =>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favorites");
        const favoriteBooks = userData.favorites;
        return res.json({
            status :"Success",
            data :favoriteBooks,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occurred"});
    }
});



module.exports =router;