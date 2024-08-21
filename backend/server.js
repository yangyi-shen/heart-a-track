import express from 'express'

const app = express()
const PORT = 6900

// AUTHENTICATION APIs
app.post('/auth/register', (req, res) => {
    // params: 
    // - username
    // - password

    // register new user
})

app.post('/auth/login', (req, res) => {
    // params: 
    // - username
    // - password

    // validate provided credentials
})

// DATA MANAGEMENT APIs
app.put('/data/write', (req, res) => {
    // params: 
    // - userId
    // - bp
    // - hr

    // create new data entry
})

app.get('/data/get', (req, res) => {
    // params:
    // - userId
    // - range

    // return data for specified user and range
})

app.listen(PORT, () => {
    console.log('server running on port 6900')
})