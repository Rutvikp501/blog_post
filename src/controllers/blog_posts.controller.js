const blogPostmodel = require("../models/blogpost.model");


exports.GetAllPost = async (req, res) => {
    
    try {
        const user  = await blogPostmodel.find();
        if (user.length>0){
        res.status(200).send(user)
        }else{
        res.status(200).send("Dont have posts To Show...")
        }
    } catch (error) {
        console.log(error);
    }
};
exports.CreatePost = async (req, res) => {
const { title, content, author } = req.body
console.log(req.body);
try {


    const user = new blogPostmodel({
        title: title,
        content: content,
        author: author,
    })
    await user.save();
    res.send("Blog created Successfully");



} catch (err) {
    console.log(err);
    res.send("Error...");
}}