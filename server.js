const express = require ('express')
const Page = require('./models/pages')
const mongoose = require('mongoose')
const pageRouter = require('./routes/pages')
const methodOverride = require('method-override')
const app = express()
const port = 5001;

mongoose.connect('mongodb://localhost/book',  {
    useUnifiedTopology: true,  
    useNewUrlParser: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/files', express.static(__dirname + 'public/files'));


app.use(methodOverride('_method'))

app.get('/', async (req, res ) => {
    const pages = await Page.find().sort({
        logDate: 'desc'
    })
    res.render('pages/index', { pages: pages})
})


app.use('/pages', pageRouter)
app.listen(process.env.PORT || port,
    () => console.info(`Listening on port ${port}`));


