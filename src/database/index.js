const mongoose = require('mongoose');
class Database{
constructor(){
this.mongoDatabase();
}
mongoDatabase(){
mongoose.connect('mongodb://localhost/api37', {
useNewUrlParser: true,
 }).then(()=>{
console.log("Sucess: Conexão com o mongoDb foi realizado com sucesso!");
 }).catch((error) =>{
console.log("Erro: Conexão com o mongoDb não foi realizado com sucesso!" + error);
 
 
 });
}
}
module.exports =new Database();