// ./controllers/authController.js

const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');
const routeGuard = require("./../middlewares/route-guard.js")
// CREAR USUARIO
// MOSTRAR EL FORMULARIO
router.get('/signup', routeGuard.usuarioNoLoggeado, authController.viewRegister);
router.post('/signup',routeGuard.usuarioNoLoggeado, authController.register)

// INICIAR SESIÓN
// A. MOSTRAR EL FORMULARIO
router.get('/login', routeGuard.usuarioNoLoggeado, authController.viewLogin);
// B. MANEJO DE FORMULARIO
router.post('/login', routeGuard.usuarioNoLoggeado, authController.login);
//CERRAR SESION
router.post("/logout", routeGuard.usuarioLoggeado, authController.logout)

module.exports = router;