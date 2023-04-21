const express = require('express')
const app = express()

const getAllAssets = require('../application-javascript/getAllAssets');
const createAsset = require('../application-javascript/createAsset');
const getAssets = require("../application-javascript/getAssetByOwner");
const getAssetHistory = require("../application-javascript/getAssetHistory");
const deleteAsset = require("../application-javascript/deleteAsset.js");
const readAsset = require("../application-javascript/readAsset")
const transferAsset = require("../application-javascript/transferAsset")


const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/createAssetForm.html");
})

app.get('/allAssets', async(req, res) => {
    //res.send("We are on get all assets");
    try {
        const assets = await getAllAssets()
        res.send(assets);
        //res.send("We are on get all assets");
        //http://localhost:3001/allAssets
        console.log("Got assets", assets)
    } catch(err) {
        res.status(500).send("Message: ", err.message)
        console.log(err.message)
    }
}) 

app.post('/createAsset', async (req, res) => {
    try {
        await createAsset(req.body.assetId, req.body.color, req.body.size, "Ambika", req.body.value);
        res.send("Created asset successfully");
    } catch(err) {
        res.status(500).send("Message: ", err.message)
        console.log(err.message)
    }
})

app.get('/getAssets', async(req, res) => {
    //res.send("We are on get all assets");
    try {
        const assets = await getAssets(req.query.owner)
        res.send(assets);
        //res.send("We are on get all assets");
        //http://localhost:3001/getAssets?owner=Varsha
        console.log("Got assets", assets)
    } catch(err) {
        res.status(500).send("Message: ", err.message)
        console.log(err.message)
    }
}) 

app.get('/assetHistory', async(req, res) => {
    //res.send("We are on get all assets");
    try {
        const assets = await getAssetHistory(req.query.assetId)
        res.send(assets);
        //res.send("We are on get all assets");
        //http://localhost:3001/assetHistory?assetId=asset2
        console.log("Got assets history", assets)
    } catch(err) {
        res.status(500).send("Message: ", err.message)
        console.log(err.message)
    }
}) 

app.get('/deleteAsset', async(req, res) => {
    //res.send("We are on get all assets");
    try {
        const assets = await deleteAsset(req.query.assetId)
        res.send("Asset deleted successfully");
    } catch(err) {
        res.status(500).send("Message: ", err.message)
        console.log(err.message)
    }
})

app.get('/readAsset', async(req, res) => {
    //res.send("We are on get all assets");
    try {
        //res.send(req.query.assetId)
        const assets = await readAsset(req.query.assetId)
        res.send(assets)
        //const assets = await readAsset(req.query.assetId)
        //res.send("Details: ", assets);
        //http://localhost:3001/readAsset?assetId=asset2
    } catch(err) {
        //res.status(500).send("Message: ", err.message)
        //console.log(err.message)
    }
})

app.get('/transferAsset', async(req, res) => {
    //res.send("We are on get all assets");
    try {
        //res.send(req.query.assetId)
        await transferAsset(req.query.assetId, req.query.to);
        res.send("Asset transfer successful")
        //const assets = await readAsset(req.query.assetId)
        //res.send("Details: ", assets);
        //http://localhost:3001/transferAsset?assetId=asset2&to=Varsha
    } catch(err) {
        //res.status(500).send("Message: ", err.message)
        //console.log(err.message)
    }
})
app.listen(3001)

