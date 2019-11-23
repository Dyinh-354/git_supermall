let express = require('express')
let path = require('path')
let ejs = require('ejs')
let app = express()
app.set('view engine', 'ejs')
app.engine('.html', ejs.__express)

app.use('/static/',(req, res, next) => {
    console.log(req.url)
    next()
} ,express.static(path.join(process.cwd(), './static/')))
app.use('/img/', (req, res, next) => {
    console.log(req.url)
    next()
}, express.static(path.join(process.cwd(), './static/img/')))
app.get('/', (req, res) => {
    res.render('./index.html')
})

app.listen(3000, () => {
    console.log('port 3000 set on')
})