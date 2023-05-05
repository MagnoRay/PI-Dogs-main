const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Importando el controlador para obtener grupo de raza de perros
const getAllDog = require('../controllers/getAllDog');
const postDogTem = require('../controllers/postDogTemper');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', getAllDog);
router.use('/newdog', postDogTem);
router.use('/temp', getAllDog);




module.exports = router;
