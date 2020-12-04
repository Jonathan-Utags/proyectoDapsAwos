const express = require('express');
const _ = require ('underscore');
const app = express();
const Producto = require ('../models/producto');

app.get('/producto', (req, res ) =>{
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
     Producto.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
    .exec((err, productos) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
    
        res.json({
            ok:true,
            msg:'Productos listados con exito',
            conteo: productos.length,
            productos:productos
        });
    });
});

app.post('/producto', function(req, res){
    let pro = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        usuario: req.body.usuario,
        categoria: req.body.categoria
    }); 

    pro.save((err, proDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al insertar el producto',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proDB
        });
    });
  });

  app.put('/producto/:id', (req, res) => {
    let id = req.params.id;  
    let body = _.pick(req.body, ['nombre', 'precio'])

    Producto.findByIdAndUpdate(id, body, {
    new:true, runValidators:true, context:'query'}, (err, proDB) => {
        if (err){
            return res.status(400).json({
                ok: false,
                msg: ' Ocurrio un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'La categoria fue actualizada con exito',
            proDB: proDB
        })
    });
  });

  app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndRemove(id, { context:'query'}, (err, catDB) => {
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok:true,
            msg: 'La categoria fue eliminada con exito',
            proDB
        })
    });
  });
module.exports = app;