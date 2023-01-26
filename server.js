const express = require ('express');
const app = express();
const serverless = require('serverless-http');
const port = 5001;


app.use(express.static('public'));

app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/files', express.static(__dirname + 'public/files'));

app.use(express.static('dist'));
app.use("/dist", express.static(__dirname + "dist/"));


app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(process.env.PORT || port,
    () => console.info(`Listening on port ${port}`));


module.exports.handler = serverless(app);
