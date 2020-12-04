const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
nombre:{
    type: String,
    require: [true,'El nombre del producto es necesario']
},
precioUni:{
    type: Number,
    require: [true,'El precio es necesario'],
    unique: true
},
categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria'
},
usuario:{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
disponible:{
    type: Boolean,
    default: true
}
});

module.exports = mongoose.model('Producto', productoSchema);