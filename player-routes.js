const express = require('express');
 import { signIn,signUp,playList,updateDetails,updateDetails,userDetails } from './player-controller';

const playerRouter=express.Router();

//Crud


// C -> Create - POST
playerRouter.post('/signup',signUp);

playerRouter.post('/signin',signIn);

playerRouter.post('/playlist',playList);

playerRouter.post('/update',updateDetails)

// R -> Read GET
playerRouter.get('/:id',userDetails);
















module.exports=playerRouter;
