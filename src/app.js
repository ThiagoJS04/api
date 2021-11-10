const express = require('express'); // Trazendo o express instalado, constante pois não ira alterar o conteúdo
const routes = require ('./routes'); // vai trazer o routes
require('./database');
class App{
constructor(){ // É o primeiro Metódo a ser excecutado
this.app = express(); // Cria propriedade (atributo chamado app, com a função express)
this.middlewares();
this.routes();
 }
middlewares(){ // é carregado antes de qualquer coisa
this.app.use(express.json());
 }
routes(){
this.app.use(routes); // é um middleware, é executado entre uma excecução e uma resposta. toda vez que é feito uma requisição é executado o middleware
 
 }
}
module.exports = new App().app; // Ta sendo exportado uma instância do express