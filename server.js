const express = require ('express')
const app = express()
const port = 5001;


app.use(express.static('public'));

app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/files', express.static(__dirname + 'public/files'));

app.use(express.static('root'));
app.use("/root", express.static(__dirname + "root/"));


app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/root/index.html");
});

app.listen(process.env.PORT || port,
    () => console.info(`Listening on port ${port}`));


