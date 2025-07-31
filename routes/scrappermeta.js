var cheerio = require('cheerio')
var needle = require('needle')
var express = require('express');
var fs = require('fs')

var router = express.Router();


var results = []

router.get('/:url', function(req, resp) {
   
    
    let urlv =  req.params.url //'https://tv9telugu.vercel.app/posts/shivani-rajasekhar-new-photos-goes-attractive-looks-like-gorgeous-04-08-2022-au24';
    console.log(urlv)
  try {
    
    needle.get(encodeURI(urlv), function(err, res) {
        
        var $ = cheerio.load(res.body)
        var title = $('meta[property="og:title"]').attr('content')
        var img = $('meta[property="og:image"]').attr('content')
        var imgt = $('meta[property="twitter:image"]').attr('content')
        var url = $('meta[property="og:url"]').attr('content')
        var desc = $('meta[property="og:description"]').attr('content')
       var vid = $('meta[property="og:video:secure_url"]').attr('content')

       
        results.push({
            title: title, img: img, imgt: imgt, url: urlv, description: desc, video: vid
        })

        //console.debug(results)
       resp.render('scrapeview', {title: "Scrape Metadata - Node.js", data: results}); 
        //fs.writeFile('./data.json', JSON.stringify(results), 'utf-8',
        // callback function
        //function(err) {     
          // if (err) throw err;
           
            //console.log("Data is stored to data.json successfully.");
             
        //})
    })
   
  }
  catch (err) {
    if(err.response) {


        resp.render('scrapeview', {title: "Scrape Metadata - Node.js", data: err.response}); 
    }}
   
   
   
    
})

module.exports = router;
