const express=require("express");

const router= express.Router();

const { handleGenrateShortUrl, handleGetAnalytics } = require("../controllers/url");

router.post("/", handleGenrateShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);


module.exports=router;