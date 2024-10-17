const express = require("express")
const router = express.Router()

const app = express()

const porta = 3333

function mostraMulher(resquest,response){
    response.json({
        nome:'Luciana Santos',
        imagem:'https://github.com/Luciana-Maria.png',
        minibio:'Estudante '
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulher',mostraMulher))
app.listen(porta, mostraPorta)