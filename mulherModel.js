const mongoose = require('mongoose')

const MulherSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    imagem:{
        type:String,
        required:false
    },
    citação: {
        type:String,
        required:false
    },
    minibio: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('diva',MulherSchema)