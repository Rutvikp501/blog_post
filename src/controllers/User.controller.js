const  usermodel = require("../models/user.model.js");


exports.GetAllUser = async (req, res) => {
    
    try {
        const user  = await usermodel.find();
        if (user.length>0){
        res.status(200).send(user)
        }else{
        res.status(200).send("Dont have Users To Show...")
        }
    } catch (error) {
        console.log(error);
    }
};

exports.Login = async (req, res) => {
    let {Email,Password}=req.body;
    const user  = await usermodel.find({Email});
    var getData = JSON.stringify(user);
    var data = JSON.parse(getData);
    console.log(req.body);
    try{
       
        if (user.length>0){
            const pass = data[0]["Password"];         
                if (Password == pass){
                    data={
                        ID:user[0]._id,
                        Name:user[0].Name,
                        Email:user[0].Email
                    }
                    console.log(data);
                    res.send(data)
                }else{
                    res.status(500).send("Enter Valid Password ")
                }    
        }
        else{
            res.status(500).send("User not found ...!")
        }
    }catch(error){
        console.log(error);
        res.status(500).send("invalid Credentials3 ")
    }
};
exports.Register = async (req, res) => {
    const { Name , Email ,Password }=req.body
    const getExistingUser = await usermodel.find({ Email: Email });    
    console.log(req.body);
    try{
        
        if (getExistingUser != "") {
            return res.send({ status: "failed", message: "Email already exist." });
          }else{
                const user = new usermodel({
                    Password:Password,
                    Name:Name,
                    Email:Email})
                await user.save();
                res.send("User Registered Successfully");          
            }
        
    
    }catch(err){
        console.log(err);
        res.send("Error...");
    }
};

