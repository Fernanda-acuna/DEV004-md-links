import path from 'path'

// se importan estas funciones desde index.js
import { mdExists, mdValid, mdRead, functionAxios } from './index.js'
import { Console } from 'console';

const ruta = "README.md" // existe
//console.log(ruta);
//const ruta = "REDME.md";  // NO existe
//const ruta = "test";  // archivo
// se esta comprobando que mdExist devuelva true, si devuelve true: se ejecuta el primer if.
// Sino, ejecuta else

function mdLinks(ruta) {
  return new Promise((resolve, reject) => {
    if (mdExists(ruta) === true) {
      const options = { validate: true };
      // path.resolve converts the relative path to an absolute path
      const rutaAbsoluta = path.resolve(ruta); // resolved path
      mdValid(rutaAbsoluta)
        .then((validRuta) => {
          return mdRead(validRuta, options); // Return the result of mdRead
        })
        .then((links) => {
          //llamamos a axios para validar enlaces
          functionAxios(links);
          //resolvemos la promesa con la lista de enlaces
          resolve(links);
          //este console muestra los links en la consola
          console.log(links);
        })
        .catch((err) => {
          console.log(err);
          //rechazamos la promesa en caso de error
          reject(err);
        });
    } else {
      console.log('falladisimo');
      //se puede rechazar en caso que el archivo no exista
      reject('archivo no encontrado');
    }
  });
}

// Usage example:
mdLinks(ruta);
