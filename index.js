const express = require('express')
const port = 3001
const app = express()

app.get('/', (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})