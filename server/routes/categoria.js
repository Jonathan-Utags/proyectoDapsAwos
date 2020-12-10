const express = require('express');
const _ = require ('underscore');
const Categoria = require ('../models/categoria');
const app = express();

app.get('/categoria', function (req, res ) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 100;
    Categoria.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    
    .exec((err, categorias) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
    
        res.json({
            ok:true,
            msg:'Categorias listadas con exito',
            conteo: categorias.length,
            categorias
        });
    });
});

app.post('/categoria', function(req, res){
    let cat = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.body.usuario
    }); 

    cat.save((err, catDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al insertar la categoria',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Categoria insertado con exito',
            catDB
        });
    });
  });

  app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;  
    let body = _.pick(req.body, ['descripcion', 'usuario'])

    Categoria.findByIdAndUpdate(id, body, {
    new:true, runValidators:true, context:'query'}, (err, catDB) => {
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
            catDB
        })
    });
  });

  app.delete('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, { context:'query'}, (err, catDB) => {
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
            catDB
        })
    });
  });
module.exports = app;