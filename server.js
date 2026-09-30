const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express=require('express');
const app=express();
const PORT=8001;
const connectToMongoDB=require('./connect');
const urlRoutes=require('./routes/url');
const url= require('./model/url');

const mongo_url= process.env.MONGO_URL;

connectToMongoDB(mongo_url).then(()=> console.log("MongoDB connected")).catch((err)=> console.log(err));


app.use(express.json());
app.use('/url',urlRoutes);

app.get('/:shortId', async (req,res)=>{
    const shortId=req.params.shortId;
    const entry= await url.findOneAndUpdate({
        shortUrl: shortId
    },{ $push:{ visitHistory: { timestamp: Date.now() } }});

   res.redirect(entry.originalUrl);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});