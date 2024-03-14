const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL= process.env.DBURL;
const Connect_DB =async()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log('Database Connected...');
    } catch (error) {
        console.error("Error While connecting DB:", error);
    }
};

module.exports={Connect_DB}