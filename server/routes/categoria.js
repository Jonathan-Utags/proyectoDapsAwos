const express = require('express');
const _ = require ('underscore');
const app = express();
const Categoria = require ('../models/categoria');

app.get('/categoria', (req, res ) =>{
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
    Categoria.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
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

module.exports = app;