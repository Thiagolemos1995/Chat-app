const express = require('express')
const router = express.Router()

//Quando o servidor estiver rodando irá mostrar esta mensagem
router.get("/", (req, res)=> {
    res.send('O servidor está rodando')
})

module.exports = router