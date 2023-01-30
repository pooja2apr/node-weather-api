const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('../utils/geocode');
const forecast=require('../utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app=express()

//Define path for express config
const publicDirectory=path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Pooja'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Pooja'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is help',
        title:'help',
        name:'Pooja'
    })
})





app.get('',(req,res)=>{
    res.send('Hello express!')
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        
           return res.send({
            error:'No address?'
           })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Pooja',
        error:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Pooja',
        error:'Page not found'
    })
})




//1.Setup the template to render the  header and footer
//2. Setup template to render an error message in a paragraph
//3. Render the template for both 404 routes
//--page not found 
//--help article not found 


// app.get('/help',(req,res)=>{
//     res.send([{
//         'name':'Pooja',
//         'Age':36
//     },{
//         'name':'Charu',
//         'Age':36
//     }])
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About page<h1>')
// })

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})

//1.Setup a help template to render a help message
//2.Setup the help route and render the template with an example message

//1. Create a html page for about with"About" title
//2. Create a html page with "Help" title
//3.Remove the old route handlers for both

//1.Setup about route to render a title with html
//2.Setup a weather route to send back json
//--Object with forecast and location strings

//1.Set up an about route and render a page title
//2.Set up a weather route and render a page title

