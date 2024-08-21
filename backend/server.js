import express from 'express'

import userUtils from './users.utils'
import dataUtils from './data.utils'

const app = express()
const PORT = 6900

// AUTHENTICATION APIs
app.post('/auth/register', (req, res) => {
    // params: 
    // - username
    // - password
    const username = req.body.username
    const password = req.body.password

    // register new user
    userUtils.registerUser(username, password)
})

app.post('/auth/login', (req, res) => {
    // params: 
    // - username
    // - password
    const username = req.body.username
    const password = req.body.password

    // validate provided credentials
    userUtils.loginUser(username, password)
})

// DATA MANAGEMENT APIs
app.put('/data/write/:id', (req, res) => {
    // params: 
    // - userId
    // - bp
    // - hr
    const userId = req.params.id
    const bp = req.body.bp
    const hr = req.body.hr

    // create new data entry
    dataUtils.writeData(userId, bp, hr)
})

app.get('/data/get/:id', (req, res) => {
    // params:
    // - userId
    // - range
    const userId = req.params.id
    const range = req.query.range

    // return data for specified user and range
    dataUtils.getData(userId, range)
})

app.listen(PORT, () => {
    console.log('server running on port 6900')
})