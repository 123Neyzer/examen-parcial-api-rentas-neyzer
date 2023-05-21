const express = require('express');
const router = express.Router();
const casas = require('../services/casas');

/* GET casas */
router.get('/', async function(req, res, next) {
  try {
    res.json(await casas.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error al obtener la informacion de las casas `, err.message);
    next(err);
  }
});

/* POST casa */
router.post('/', async function(req, res, next) {
    try {
      res.json(await casas.create(req.body));
    } catch (err) {
      console.error(`Error cuando se crean los datos de la casa`, err.message);
      next(err);
    }
  });

  /* PUT casa */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await casas.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error mientras se actualizaban los datos de la casa`, err.message);
      next(err);
    }
  });

  /* DELETE casa */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await casas.remove(req.params.id));
    } catch (err) {
      console.error(`Error mientras se eliminaban los datos de la casa`, err.message);
      next(err);
    }
  });

module.exports = router;