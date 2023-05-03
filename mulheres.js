const express = require("express")//Aqui estou iniciando o express
const router = express.Router()// Aqui estou configurando a primeira parte da rota
const cors =require('cors')//aqui estou trazendo o pacote cors permite consumir essa API no Front-End
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require('./mulherModel')

const app = express()//Aqui estou iniciando o app
app.use(express.json())//dados que vão trafegar estarão no json
app.use(cors())

const porta = 3333//aqui estou criando a porta

//GET
async function mostraMulheres(request, response){
   try{
      const mulheresVindasDoBancoDeDados = await Mulher.find()

      response.json(mulheresVindasDoBancoDeDados)

   }catch (erro) {
      console.log(erro)
   }
}

//Post
async function criaMulher(request, response) {
   const novaMulher = new Mulher({
      nome:  request.body.nome,
      imagem: request.body.imagem,
      minibio: request.body.minibio,
      citacao: request.body.citacao
   }) 

   try {
      const mulherCriada = await novaMulher.save()
      response.status(201).json(mulherCriada)
   }catch (erro) {
      console.log(erro)
   }
}
//Patch
async function corrigeMulher(request, response) {
   try   {
         const mulherEncontrada = await Mulher.findById(request.params.id)
         if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
         }

         if (request.body.minibio) {
               mulherEncontrada.minibio = request.body.minibio
         }
            
         if (request.body.imagem) {
               mulherEncontrada = request.body.imagem
         }
            
         if (request.body.citacao) {
               mulherEncontrada = request.body.citacao  
         }

         const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

         response.json(mulherAtualizadaNoBancoDeDados)
   } catch (erro) {
      console.log(erro)
   }     
}

//DELETE
async function deletaMulher(request, response) {
   try {
       await Mulher.findByIdAndDelete(request.params.id)
       response.json({ menssagem: 'Mulher deletada com sucesso!'})
   } catch(erro) {
     console.log(erro)
   }
}


app.use(router.get('/mulheres', mostraMulheres))//rota GET/mulheres
app.use(router.post('/mulheres', criaMulher))//Configurei rota, POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))//configurei a rota patch /mulheres
app.use(router.delete('/mulheres/:id', deletaMulher))// configurei rora DELETE /mulheres


//Porta
function mostraPorta() {
console.log("Servidor criado e rodando na porta ", porta )
}


app.listen(porta, mostraPorta)//Servidor ouvindo a porta
