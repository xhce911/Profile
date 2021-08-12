const express = require('express')
const Page = require('./../models/pages')
const router = express.Router()


router.get('/new', (req, res) => {
    res.render('pages/new', { page: new Page()})
})

router.get('/edit/:id', async (req, res) => {
    const page = await Page.findById(req.params.id)
    res.render('pages/edit', { page: page})
})

router.get('/team', async (req, res) =>{
    res.render('pages/team',{page: page})
})



router.get('/:slug', async (req, res) => {
    const page = await Page.findOne({ slug: req.params.slug})
    const pages = await Page.find().sort({logDate: 'desc'})
    if(page == null) res.redirect('/')
    res.render('pages/show', {page: page , pages: pages})
})


router.post('/', async (req, res, next)=> {
    req.page = new Page()
    next()
}, savePageRedirect('new'))

router.put('/:id', async  (req, res, next) =>{
    req.page = await Page.findById(req.params.id)
    next()
},  savePageRedirect('edit'))

router.delete('/:id', async (req, res) =>{
    await Page.findByIdAndDelete(req.params.id)
    res.redirect('/')
 })


function savePageRedirect(path){
    return async (req, res) =>{
        let page =  req.page
        page.title = req.body.title
        page.author = req.body.author
        page.content = req.body.content
        page.logDate = req.body.logDate

        try{
            page =  await page.save()
            res.redirect(`/pages/${page.slug}`)
         }
         catch(e){
             console.log(e)
             res.render(`pages/${path}`, {page: page})
         }
    }}




module.exports = router 