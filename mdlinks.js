import path from 'path'

// se importan estas funciones desde index.js
import { mdExists, mdValid, mdRead, functionAxios } from './index.js'

const ruta = "README.md" // existe
//console.log(ruta);
//const ruta = "REDME.md";  // NO existe
//const ruta = "test";  // archivo
// se esta comprobando que mdExist devuelva true, si devuelve true: se ejecuta el primer if.
// Sino, ejecuta else

function mdLinks(ruta) {
  console.log(ruta);
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
          console.log(links); // Process the extracted links here
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('falladisimo');
    }
  });
}

// Usage example:
mdLinks(ruta);
