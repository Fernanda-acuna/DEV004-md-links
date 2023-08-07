import path, { resolve } from 'path'

// se importan estas funciones desde index.js
import { mdExists, mdValid, mdRead, functionAxios } from './index.js'

const rutaFinal = process.argv[2];  // existe
console.log(ruta);
//const ruta = "REDME.md";  // NO existe
//const ruta = "test";  // archivo
// se esta comprobando que mdExist devuelva true, si devuelve true: se ejecuta el primer if.
// Sino, ejecuta else
(function mdLinks(process.argv[2]) {
  console.log(ruta);
  return new Promise ((resolve, reject) => {
    if(mdExists(ruta) == true){
    const options = {validate: true}
      //path.resolve convierte la ruta relativa en absoluta
    const rutaAbsoluta = path.resolve(ruta) // ruta resuelta
    mdValid(rutaAbsoluta)
    //console.log('Ok', mdValid(rutaAbsoluta));
    //convertir a sincrona par asi dejar menos then
    mdValid(rutaAbsoluta)
    //si la promeda se resuelve se ejecuta then
    //aqui debo ingresar mi mdread
    .then((ruta)=>{
      // return mdRead(ruta, options)
  console.log(mdRead(ruta, options));
    })
    // .then ((links) => {
    //   return functionAxios(links)
    // })
    .catch((err)=>{
      console.log(err);
    })
  }else{
      //si el archivo no existe, se imprime fail en la consola
    console.log('falladisimo');
  };
  })
  
  
}) ()
// importar fn mdread
// en la linea 19 llmar a la fn mdRead y enviar rutaAbsoluta
// ir a index