const express = require ('express')
const app = express()
const port = 5001;


app.use(express.static('public'));

app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/files', express.static(__dirname + 'public/files'));

app.use(express.static('views'));
app.use("/views", express.static(__dirname + "views/"));


app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(process.env.PORT || port,
    () => console.info(`Listening on port ${port}`));


