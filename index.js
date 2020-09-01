const express = require('express');
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const posts =[];
let currentId = 1;

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*')
//     next()
// })

app.get('/posts',(req,res)=>{
    return res.json(posts)
})

app.post('/posts',(req,res)=>{
    const {author, content} = req.body;
    const post = {author,content, id: currentId++}
    posts.push(post)
    return res.status(201).json(post)
})
//1
app.get('/posts/:id',(req,res)=>{
    const {id} = req.params //id ==>string
    const post = posts.find(i => i.id === Number(id))
    if(!post){
        return res.sendStatus(404)
    }
    return res.json(post)
})
//2
app.put('/posts/:id',(req,res)=>{
    const {id} = req.params //id ==>string
    //put changing
    const {author, content} = req.body;

    const post = posts.find(i => i.id === Number(id))
    if(!post){
        return res.sendStatus(404)
    }
    post.author = author
    post.content = content
    return res.json(post)
})

//3
app.delete('/posts/:id',(req,res)=>{
    const { id } = req.params //id ==>string
    //delete use find index
    const postIndex = posts.findIndex((i) => i.id === Number(id))
    //如果findindex没有找到则会返回-1
    if(postIndex === -1){
        return res.sendStatus(404)
    }
    //找到从array中删除postindex位置，删除一个
    const deletePost =  posts.splice(postIndex,1)
    //返回值可以为200，或200+deleted resources，或204(no content)
    return res.json(deletePost)
})

app.listen(3000,()=>{
    console.log('server listening on port 3000')
})