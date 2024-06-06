const shortid = require('shortid');
const URL = require('../models/url');

async function handelGeneratenewShortUrl(req, res){
    const body = req.body;

    if(!body.url){
        // console.log("URL has been required.");
        // res.status(400).json({message:"URL has been required."});
        res.render('form',{
            message : "URL has been required."
        });
    }else{
        // const { nanoid } = await import('nanoid');
        // const shortID = nanoid(8);
        const shortID = shortid();

        let result = await URL.create({
            shortId:shortID,
            redirectUrl:body.url,
            visitHistory:[],
        });

        // console.log("Data Inserted Successfully.");
        // res.status(201).json({
        //     message:"Data Inserted Successfully",
        //     id:shortID
        // });
        res.render('form',{
            message : `The New URL Generated - http://localhost:8000/url/${shortID}`,
            id : shortID
        });
    }
}


async function handelToGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.status(200).json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory,
    });
}

async function handelRedirectUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push : {
                visitHistory : {
                    timestamp : Date.now(),
                }
            }
        }
    );

    if (entry && entry.redirectUrl) {
        res.redirect(entry.redirectUrl);
    } else {
        res.status(404).json({message: 'URL not found'});
    }
}

async function testrenderViews(req, res){
    const allUrls = await URL.find();
    res.render('home',{
        urls : allUrls,
    });
}

async function staticsRenderViews(req, res){
    const allUrls = await URL.find();
    res.render('form',{
        urls : allUrls,
    });
}




module.exports = {
    handelGeneratenewShortUrl,
    handelToGetAnalytics,
    handelRedirectUrl,
    testrenderViews,
    staticsRenderViews
}