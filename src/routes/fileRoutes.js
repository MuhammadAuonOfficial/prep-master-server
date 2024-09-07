const express = require('express')
const path = require('path')
const fs = require('fs-extra')

const router = express.Router()

router.get('/assets/:filename', (req, res) => {
    const { filename } = req.params
    const filePath = path.join(__dirname, '../uploads', filename)
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found')
        }
        res.sendFile(filePath)
    })
})