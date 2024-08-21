import express from 'express'
import cors from 'cors'

import userUtils from './users.utils.js'
import dataUtils from './data.utils.js'

const app = express()
const PORT = 6900

app.use(cors())

// AUTHENTICATION APIs
app.post('/user/register', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        await userUtils.registerUser(username, password)
        res.send(true)
    } catch (error) {
        res.send(false)
    }
})

app.post('/user/login', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
    
        await userUtils.loginUser(username, password)
        res.send(true)
    } catch (error) {
        res.send(false)
    }
})

// DATA MANAGEMENT APIs
app.put('/data/write/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const bp = req.body.bp
        const hr = req.body.hr
    
        await dataUtils.writeData(userId, bp, hr)
        res.send(true)
    } catch (error) {
        res.send(false)
    }
})

app.get('/data/get/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const range = req.query.range

        const response = await dataUtils.getData(userId, range)
        res.send(response)
    } catch (error) {
        res.send(false)
    }
})

app.listen(PORT, () => {
    console.log('server running on port 6900')
})