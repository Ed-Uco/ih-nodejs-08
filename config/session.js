//GESTION DE LA SESION
//CONFIGURACION, TIEMPO DE EXPIRACION DE LA SESION


// 1. IMPORTACIONES
// INSTALAR LIBRERIA PARA SESIONES express-session, connect-mongo
const session = require('express-session')
const MongoStore = require('connect-mongo')

//2. GESTION DE SESION

const sessionManager = (app) => {

//a. Establecer seguridad y flexibilidad ante servidores externos, puntualmente Cloud(Heroku).
      app.set("trust proxy", 1)  //confiar en todos los elementos cloud que se puedan aplicar.
//b. Establecer la configuracion de la sesion.
      app.use(session({
            secret: 'secret', // PALABRA SECRETA PARA COINCIDIR EN EL SERVIDOR
            resave: true,
            saveUninitialized: false,
            cookie: {  // ARCHIVO UNICO QUE SE GENERA EN EL SERVIDOR CON LOS DATOS ELEGIDOS DEL USUARIO, SE ENVIA PARCIALMENTE UNA COPIA DE LOS DATOS A LA BASE DE DATOS Y LA COOKIE SE ENVIA AL CLIENTE.
            httpOnly: true,
            maxAge:86400000, // 1 milisegundo. 1000*60*60*24 => 24 Horas
            },
            store: MongoStore.create({
                  mongoUrl: process.env.MONGODB_URI
            })
      }))
}
//sessionManager(___) hay que pasar un argumento al invocar sessionManager

//3. EXPORTACION
module.exports = sessionManager