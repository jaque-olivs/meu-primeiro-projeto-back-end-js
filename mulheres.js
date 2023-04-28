const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333
const mulheres = [
 {   
    nome: 'Simara Conceição',
    imagem: 'htpps://github.com/simaraconceicao.png',
    minibio: 'Desenvolvedora e instrutora'
 },
 {
    nome: 'Iana Chan',
    imagem: 'htpps://github.com/simaraconceicao.png',
    minibio: 'Fundadora da programaria'
 },
 {
    nome: 'Nina da Hora',
    imagem: 'htpps://github.com/simaraconceicao.png',
    minibio: 'Hacker antiracista'
 }
]

function mostraMulheres(request, response){
     response.json(mulheres)
}
function mostraPorta() {
console.log("Servidor criado e rodando na porta ", porta )
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)
