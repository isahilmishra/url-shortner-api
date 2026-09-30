const shortId=require('shortid');
const Url=require('../model/url');

async function handleGenrateShortUrl(req,res){
      const body= req.body;
      if(!body.url) return res.status(400).json({error:"url is required"});
      const shortid= shortId();

      await Url.create({
          shortUrl: shortid,
          originalUrl: body.url,
          visitHistory: []
      });

      return res.json({id : shortid});
}
 async function handleGetAnalytics(req,res){
      const shortId=req.params.shortId;

      const result= await Url.findOne({shortUrl: shortId});
      if (!result) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }
      return res.json({
        totalVisits: result.visitHistory.length,
        analytics: result.visitHistory
      })
 }
 

module.exports= {handleGenrateShortUrl, handleGetAnalytics};