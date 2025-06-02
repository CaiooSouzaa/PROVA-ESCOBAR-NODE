//E COMMERCE JOGOS
const express = require("express") 

var app = express()

//require("./routes/usuario_rotas")(app)
//require("./routes/produtos")(app)
//require("./routes/vendas")(app)

app.listen(3001, function(){
    console.log('Servidor ativo')
})

app.get('/', function(req, res){
    
    return res.send('Home')
})

app.post('/api/login_usuario', function(req, res){
    var criacao = "Sucesso"
    return res.send(criacao)
})

app.post('/api/cadastro_usuario', function(res,req){

})

app.get('/api/lista_usuario', function(req, res){

})

app.put('/api/atualizar_cadastro_cliente', function(req, res){
    
})

app.delete('/api/deletar_usuario', function(req, res){

})

app.post('/api/cadastro_produto', function(req, res){

})

app.get('/api/lista_porduto', function(res, req){

})

app.put('/api/atualizar_produto', function(req,res){

})

app.delete('/api/deletar_poduto', function(req, res){

})

app.get('/api/lista_venda', function(req, res){

})