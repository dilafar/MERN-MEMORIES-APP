const express = require('express');
const { findByIdAndUpdate } = require('../models/postMessage');
let postMessage = require('../models/postMessage');

const getPosts = async(req,res)=>{
    await postMessage.find().then((posts)=>{
        res.status(200).json(posts);
    }).catch((err)=>{
        res.status(404).json(err);
        console.log(err);
    })
};

const createPost = (req,res)=>{
    const{ title,message,creator,tags,selectedFile}= req.body;
    const newPost = new postMessage({
        title,message,creator,tags,selectedFile
    });
    newPost.save().then(()=>{
        res.status(201).json(newPost);
    }).catch((err)=>{
        console.log(err);
        res.status(409).json(err);
    })
};

const updatePost =async(req,res)=>{
        const  userid = req.params.id;
        const{ title,message,creator,tags,selectedFile}= req.body;
        const updatePost = {
            title,
            message,
            creator,
            tags,
            selectedFile
        }
        const update = await postMessage.findByIdAndUpdate(userid,updatePost).then(()=>{
            res.status(200).json(updatePost);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })

};

const deletePost = async(req,res)=>{

    const id = req.params.id;
    await postMessage.findByIdAndDelete(id).then(()=>{
            res.status(200).json({msg:"Deletion successfull"});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })

};


module.exports = {getPosts,createPost,updatePost,deletePost};