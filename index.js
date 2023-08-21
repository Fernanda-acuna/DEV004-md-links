
// Aqui estan las funciones pequeñas que se exportan a mdlinks.js

// const fs = require('fs'); --no vamos a usar el require.
import fs from 'fs';
import path from 'path';
import axios from 'axios';
//ruta es el readme.md
// funcion que dice si la ruta existe o no
export const mdExists = (ruta) => {
  // podemos resumir la funcion retornando solo el fs.ES
  if (fs.existsSync(ruta)) {
    return true
  } else {
    return false
  }

};
//mdValid indica si la ruta es valida o no
export const mdValid = (ruta) => {
  //se crea una promesa con los parametros de callback resolve y reject
  return new Promise((resolve, reject) => {
    //la funcion asincronica fs.stat toma la ruta del archivo y una funcion callback
    //esta funcion tmb se puede resumir un poco
    fs.stat(ruta, (err, stats) => {
      //throw error dentiene la ejecucion y se podria manejar en otro lugar de mi codigo
      if (err) throw err;
      // console.log(stats.isFile());
      // stats.isFile verifica si el archivo es un archivo valido, si da true: continua con la verificacion
      if (stats.isFile() == true) {
        //con path.extname se obtiene la extencion del archivo, si es md, se resuelve true, sino reject
        if (path.extname(ruta) == '.md') {
          resolve(ruta)
        } else {
          reject(false)
        }

      } else {
        console.log('No soportamos');
      }
    });
  })
}

// codigo con modificaciones
export const mdRead = (ruta, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (err, data) => {
      if (err) {
        console.log('no leyo el archivo: ', err);
        reject(err); // Reject the promise if an error occurs during file read
      } else {
        const linksResult = [];

        const fileSplit = data.split('\n');
        fileSplit.forEach(elements => {
          const regexText = /\[(.*?)\]/g;
          const regexLinks = /https:\/\/[^\s)]+/g;
          const links = elements.match(regexLinks);
          const texto = elements.match(regexText);
          if (elements.match(regexLinks)) {
            linksResult.push({ "href": links, "text": texto, "file": ruta });
          }
        });
        resolve(linksResult); // Resolve the promise with the extracted links
      }
    });
  });
}


export const functionAxios = (linksAxios) => {
//console.log(linksAxios);
const promisesArray = linksAxios.map((obj) =>axios.get(obj.href));
return Promise.allSettled(promisesArray)
.then((result) => {
  const validateLink = [];
  result.forEach((promise, i) => {
    if (promise.status === 'fulfilled') {
      validateLink.push({
        href: linksAxios[i].href,
        text: linksAxios[i].text,
        file: linksAxios[i].file,
        status: promise.value.status,
        ok: 'Ok',
      });
    } else if (promise.status === 'rejected') {
      let error_status = undefined;
      if ('response' in promise.reason){
        if ('status' in promise.reason.response){
          error_status = promise.reason.response.status;
        }
      }
      validateLink.push({
        href: linksAxios[i].href,
        text: linksAxios[i].text,
        file: linksAxios[i].file,
        status: error_status,
        ok: 'Fail',
      });
    }
  });
  return validateLink;
});
};
              // console.log('Llamada exitosa');
             
        
    

