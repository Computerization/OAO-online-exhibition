const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");

var bodyParser = require('body-parser')

const url = "mongodb://127.0.0.1:27017/mydb";

var dbo;

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    dbo = db.db("OAO");
    console.log("Connected to MongoDB");
})

app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/OAO/api/addmessage/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    let newMessage = {
        picID: req.body.picID,
        email: req.body.email,
        context: req.body.context
    }
    dbo.collection("messages").insertOne(newMessage, function(err, result) {
        if (err) throw err;
        res.send("Success");
    });
});

app.post('/OAO/api/addlike/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    let picID = req.body.picID;

    dbo.collection("likes").find({ "picID": picID }).toArray(function(err, result) {
        if (err) throw err;
        if (result == undefined)
            res.send("ConnectionFailed");
        else if (result.length != 0) {
            dbo.collection("likes").updateOne({ "picID": picID }, { $set: { likes: result[0].likes + 1 } }, function(err, result) {
                if (err) throw err;
                dbo.collection("likes").find({ "picID": picID }).toArray(function(err, result) {
                    if (err) throw err;
                    if (result == undefined)
                        res.send("ConnectionFailed");
                    else if (result.length != 0)
                        res.send(result[0].likes.toString());
                    else {
                        let picsInfo = {
                            "picID": picID,
                            "likes": 1
                        }
                        dbo.collection("likes").insertOne(picsInfo, function(err, result) {
                            if (err) throw err;
                            res.send("1");
                        });
                    }
                });
            });
        } else {
            let picsInfo = {
                "picID": picID,
                "likes": 1
            }
            dbo.collection("likes").insertOne(picsInfo, function(err, result) {
                if (err) throw err;
                res.send("1");
            });
        }
    });
})

app.post('/OAO/api/cancellike/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    let picID = req.body.picID;

    dbo.collection("likes").find({ "picID": picID }).toArray(function(err, result) {
        if (err) throw err;
        if (result == undefined)
            res.send("ConnectionFailed");
        else if (result.length != 0) {
            dbo.collection("likes").updateOne({ "picID": picID }, { $set: { likes: result[0].likes - 1 < 0 ? 0 : result[0].likes - 1 } }, function(err, result) {
                if (err) throw err;
                dbo.collection("likes").find({ "picID": picID }).toArray(function(err, result) {
                    if (err) throw err;
                    if (result == undefined)
                        res.send("ConnectionFailed");
                    else if (result.length != 0)
                        res.send(result[0].likes.toString());
                    else {
                        let picsInfo = {
                            "picID": picID,
                            "likes": 0
                        }
                        dbo.collection("likes").insertOne(picsInfo, function(err, result) {
                            if (err) throw err;
                            res.send("0");
                        });
                    }
                });
            });
        } else {
            let picsInfo = {
                "picID": picID,
                "likes": 0
            }
            dbo.collection("likes").insertOne(picsInfo, function(err, result) {
                if (err) throw err;
                res.send("0");
            });
        }
    });
})

app.post('/OAO/api/displikes', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    let picID = req.body.picID;

    dbo.collection("likes").find({ "picID": picID }).toArray(function(err, result) {
        if (err) throw err;
        if (result == undefined)
            res.send("ConnectionFailed");
        else if (result.length != 0)
            res.send(result[0].likes.toString());
        else {
            let picsInfo = {
                "picID": picID,
                "likes": 0
            }
            dbo.collection("likes").insertOne(picsInfo, function(err, result) {
                if (err) throw err;
                res.send("0");
            });
        }
    });
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});