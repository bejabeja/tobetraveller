const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    const userData = 
    [
        {
            "id" : 1,
            "name" : "Mimi",
            "lasName" : "ouwww",
            "email" : "test1@gmail.com",
            "password" : "password"
        },
        {
            "id" : 2,
            "name" : "Test",
            "lastName" : "hihihi",
            "email" : "test2@gmail.com",
            "password" : "password"
        }
    ]
    res.send(userData)
})

module.exports = router