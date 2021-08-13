const express = require ('express')
const Page = require('./models/pages')
const pageRouter = require('./routes/pages')
const app = express()
const port = 5001;


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/files', express.static(__dirname + 'public/files'));


app.get('/', async (req, res ) => {
    res.render('pages/index', { pages: pages})
})


app.use('/pages', pageRouter)

app.listen(process.env.PORT || port,
    () => console.info(`Listening on port ${port}`));


