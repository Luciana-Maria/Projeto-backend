const express = require("express")//inicio do express
const router = express.Router()//configuração da 1°parte da rota
const cors = require('cors')

const  conectaBancoDeDados = require('./bancoDeDados.js')
conectaBancoDeDados()

const Mulher = require('./mulherModel.js')



const app = express()//iniciando o app
app.use(cors())
app.use(express.json())
const porta = 3333 //criar porta
//lista inicial de mulheres



//get
async function mostraMulheres(resquest,response){
  try{
    const mulheresVindasDoBancoDeDados = await Mulher.find()
    response.json(mulheresVindasDoBancoDeDados)
  }catch(erro){
    console.log(erro)
  }
  
}
//post
async function criaMulher(request,response){
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio:  request.body.minibio,
    citacao: request.body.citacao
  })

  try{
    const mulherCriada = await novaMulher.save() 
    response.status(201).json(mulherCriada)
  }catch(erro){
    console.log(erro)
  }
}

//patch
async function corrigeMulher(request, response){
  try{
    const mulherEncontrada = await Mulher.findById(request.params.id)
    if (request.body.nome){
      mulherEncontrada.nome = request.body.nome
    }
    if(request.body.minibio){
      mulherEncontrada.minibio = request.body.minibio
    }
  
    if(request.body.imagem){
      mulherEncontrada = request.body.imagem
    }
    
    if(request.body.citacao){
      mulherEncontrada = request.body.citacao
    }
    
    const mulherAtualizadaNoBancoDeDados = await  mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)
  }catch(erro){
    console.log(erro)
  }

  }



//delete
async function deletaMulher(request,response){
  try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({ messagem:'Mulher deletada com sucesso!'})
  } catch(erro) {
    console.log(erro)
  }

  
}


//porta
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulheres',mostraMulheres))
app.use(router.post('/mulheres',criaMulher))//configurei rota
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id',deletaMulher))

app.listen(porta, mostraPorta)//servidor ouvindo a porta