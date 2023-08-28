import path from 'path'
// se importan estas funciones desde index.js
import { mdExists, mdValid, mdRead, functionAxios } from './mdlinks.js'


const ruta = "README.md" // existe


function mdLinks(ruta, options) {
  return new Promise((resolve, reject) => {
    if (mdExists(ruta) === true) {
      options = { validate: true };
      // path.resolve converts the relative path to an absolute path
      const rutaAbsoluta = path.resolve(ruta); // resolved path
      mdValid(rutaAbsoluta)
        .then((validRuta) => {
          return mdRead(validRuta, options); // Return the result of mdRead
        })
        .then(async (links) => {
          if (options.validate) {
            //llamamos a axios para validar enlaces
            const newLinks = await functionAxios(links);
            //console.log(links);
            //este console muestra los links en la consola
            console.log(newLinks);

            return newLinks;
          } else {
            console.log(links);

            return links;
          }
          
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

export { mdLinks };
