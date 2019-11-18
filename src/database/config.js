const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://onizuka:jones666@cluster0-f7xn0.mongodb.net/test?retryWrites=true&w=majority', {userNewParser: true})
.then(() => {
  console.log('Conectado com o BD');
}).catch(err => {
  console.log('Erro ao conectar com o BD', err);
  process.exit();
});



module.exports = mongoose;
