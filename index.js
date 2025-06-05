//E COMMERCE JOGOS
const express = require("express") 

var app = express()

app.use(express.json())

require("./routes/usuario")(app)
require("./routes/produto")(app)
require("./routes/vendas")(app)
//require("./routes/cliente")(app)
//require("./routes/categoria")(app)

app.listen(3000, function(){
    console.log('Servidor ativo')
})

app.get('/', function(req, res){
    
    return res.send('Home')
})