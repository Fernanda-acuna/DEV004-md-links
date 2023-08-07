
// Aqui estan las funciones pequeñas que se exportan a mdlinks.js

// const fs = require('fs'); --no vamos a usar el require.
import fs from 'fs';
import path from 'path';
import axios from 'axios'
//ruta es el readme.md
// funcion que dice si la ruta existe o no
export const mdExists = (ruta) => {
  // podemos resumir la funcion retornando solo el fs.ES
  if (fs.existsSync(ruta)) {
    return true
  } else {
    return false
  }



  /*const ruta = fs.stat(path, (err, stats) => {
      if (err) {
          if (err.code === 'ENOENT') {
              console.error('Path does not exist');
          } else {
              console.error('An error occurred while checking the path:', err);
          }
      } else {
          console.log('Path exists');
      }
  });*/
};

// esta funcion verifica si el archivo en la ruta dada es valido
// y devuelve una promesa
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

// revisar promesa y callback

//recibir ruta como parametro
// googlear 'leer el contenido d eun archivo node js
// intentar implementar dentro de mdRead



export const mdRead = (ruta, options) => {
  const linksResult = [];

  // return new Promise(function(resolve, reject) {    
    // Make an asynchronous call and either resolve or reject

  fs.readFile(ruta, 'utf-8', (err, data) => {
    if (err) {
      console.log('no leyo el archivo: ', err);
    } else {
      const fileSplit = data.split('\n');
      fileSplit.forEach( elements => {
        const regexText = /\[(.*?)\]/g;
        const regexLinks = /https:\/\/[^\s)]+/g;
        const links = elements.match(regexLinks);
        const texto = elements.match(regexText);
        if (elements.match(regexLinks)){
          linksResult.push({ "href": links, "text": texto, "file": ruta });
          return linksResult;
  
        }
      
      });
    };
    });
  }

export const functionAxios = (links) => {
console.log(links);
      // if (options.validate) {
        links.forEach(link =>{
          axios.get(link)
            .then(response => {
              // console.log('Llamada exitosa');
              if (response.status === 200) {

                links.push({  "status": response.status, "ok": "ok" });
								console.log(links);
              } else {
                links.push({  "status": response.status, "ok": "fail" });
								console.log(links);
              }
            })
            .catch(error => {
              // console.error('Error al hacer la solicitud a la API:', error);
              // console.log('Llamada fallida');
              links.push({ "href": link, "text": texto, "file": ruta, "status": null, "ok": "fail" });
            });
        })

      // } else {
      //   links.push({ "href": link, "text": texto, "file": ruta });
      // }
    }
  // };


// });




// export const mdRead = (ruta, options) => {
  
//   const links = []
//   //la funcion readfile lee el archivo ruta, utf-8 es para leer en modo texto
//   //err y data son callbacks, debe retornar una promesa (new promise)//
//   fs.readFile(ruta, 'utf-8', (err, data) => {
//     if (err) {
//       console.log('no leyo el archivo: ', err);
//     } else {
//       // data.map(element => {
//         // Regex obtención del texto
//         const regexText = /\[(.*?)\]/g;
//         // Regex para obtener links
//         const regexLinks = /https:\/\/[^\s)]+/g;
//         //con match y regex se encuentran los enlaces o texto (se guardan en link) 
//         const link = data.match(regexLinks);
//         const texto = data.match(regexText);
// //con response se verifica el estado del enlace
//         if (options.validate){
//           console.log(options);
//           // response(API externa) = hacer la llamada (con request)
//           if (response.status_code == 200){

//             resultado = "ok"
//           } else {
//             resultado = "fail"
//           }
//           links.push({ "href": link, "text": texto, "file": ruta, "status": response.status_code, "ok": resultado   });
//         } else {
//           links.push({ "href": link, "text": texto, "file": ruta });
//         }
//       // });

//       console.log(links)

//       const found = paragraph.match(regex);
//       //console.log('si leyo ', data);
//     }
//   });

