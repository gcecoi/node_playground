const express = require('express')
const  router = express.Router()

router.get('/', (req, res) => {
    res.send('Darova na')
})

module.exports = router