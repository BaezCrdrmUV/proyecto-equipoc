import "reflect-metadata";
import {ArtistasRepository} from "./bd/controllersBd/ArtistasRepository"
import {AlbumesRepository} from "./bd/controllersBd/AlbumesRepository";
import {CancionesRepository} from "./bd/controllersBd/CancionesRepository";
import {ArtistaParser} from "./Utilities/Parser/ArtistaParser";
import {AlbumParser} from "./Utilities/Parser/AlbumesParser";
import {CancionParser} from "./Utilities/Parser/CancionParser"
import {Artista} from "./bd/entity/Artista";
import * as aplicattion from "./app";
import {createConnection} from "typeorm";
import { format } from "url";
import {v4 as uuidv4} from "uuid"
import app from "./app";

var http = require('http');
var https = require('https');

//comentario de prueba
//si se compilo
let server = http.createServer(app);
//const ip = "192.168.100.51";
const port = 4001;


server.listen(port, function () {
 
    let artistaRepository = new ArtistasRepository();
    let albumRepository = new AlbumesRepository();
    let cancionRepository = new CancionesRepository();
    let artistaJson = {
        id:"",
	nombre:"James Hetfield Lars Ulrich Kirk Hammet",
        nombreArtistico:"Metallica",
        anoDeNacimiento:2035,
        web:"www.gary.com",
        nacionalidad:"Irlanda",
	fkIdEstatus:null,
        albumes:[]
    }
let artistaJsonUpdate = {
        id:"cc39d91b-3d11-4bc0-8f65-a9a8da4a7495",
	nombre:"Luis Miguel Hernandez",
        nombreArtistico:"Luis Miguel",
        anoDeNacimiento:2035,
        web:"www.lismiguel.com",
        nacionalidad:"Mexico",
	fkIdEstatus:null,
        albumes:[]
    }

    let albumJson ={ 
        id:"",
	fkIdArtista:"cc39d91b-3d11-4bc0-8f65-a9a8da4a7495",
        titulo: "Metropolis Pt 2",
        duracion: 4600, 
        numeroDeTracks: 14, 
        companiaProductora: "Otra compania",
        tipoDeAlbum: "sencillo",
        anoDeLanzamiento: "2008-03-06",
	fkIdEstado:null,
        canciones: [],
        artista:null
        
    }

    let albumJsonUpdate ={ 
        id:"7bdd075f-be64-494b-b81d-38a0dd743396",
	fkIdArtista:"3c2f2dd9-94a6-4845-bbad-a79e5aee64cd",
        titulo: "Nunca es tarde para amar",
        duracion: 4600, 
        numeroDeTracks: 6, 
        companiaProductora: "Luis miguel records",
        tipoDeAlbum: "sencillo",
        anoDeLanzamiento: "2000-03-06",
	fkIdEstatus:2,
        canciones: [],
        artista:null
        
    }
    let cancionJson ={
	fkIdAlbum: "1", 
        titulo: "afterlife",
        numeroDeTrack: 7,
        genero: "Progresive metall",
        duracion: 9600, 
        contenidoExplicito: 0,
        album:null
    }

    let cancionJsonUpdate ={
        id:"cc39d91b-3d11-4bc0-8f65-a9a8da4a7495",
	fkIdAlbum: '1', 
        titulo: "amarte es un placer",
        numeroDeTrack: 7, 
        genero: "pop",
        duracion: 7600, 
        contenidoExplicito: 0,
	fkIdEstatus:null,
        album:null
    }

   //let artistaUpdate = ArtistaParser.jsonToArtista(artistaJsonUpdate);
    //let albumUpdate = AlbumParser.jsonToAlbum(albumJsonUpdate);
    //let cancionUpdate = CancionParser.jsonToCancion(cancionJsonUpdate);
    
    //artistaRepository.crearArtista(artistaJson);
    //artistaRepository.actualizarArtista(artistaUpdate );
    //albumRepository.crearAlbum(albumJson);
    //albumRepository.actualizarAlbum(albumUpdate);
    //cancionRepository.crearCancion(cancionJson);
    //cancionRepository.actualizarCancion(cancionUpdate);
    //albumRepository.obtenerCanciones();
    
    /* let artista =artistaRepository.buscarArtistaPorId("cc39d91b-3d11-4bc0-8f65-a9a8da4a7495");
     artista.then(function(value) {
        console.log(value.nombreArtistico); // Success!
      }, function(reason) {
        console.log(reason); // Error!
      }); */
      
    /*  let artista2 = artistaRepository.buscarArtistaPorNombre("Dream Theather");
    artista2.then(function(value) {
        console.log(value.nombreArtistico); // Success!
      }, function(reason) {
        console.log(reason); // Error!
      }); 
 */
      /* let album = albumRepository.obtenerAlbumPorId("b3e9c90d-bb23-4941-b0ce-d01713309a80");
      album.then(function(value) {
        console.log("METROPOLIS " +value.titulo); // Success!
      }, function(reason) {
        console.log(reason); // Error!
      }); */
     /*  let album2 = albumRepository.obtenerAlbumPorNombre("When Dream and Day Unite");
      album2.then(function(value) {
        console.log("WHEN DREAM "+ value.titulo); // Success!
      }, function(reason) {
        console.log(reason); // Error!
      }); */

     /*  let albumesDeArtista = albumRepository.obtenerAlbumesPorIdArtista("cc39d91b-3d11-4bc0-8f65-a9a8da4a7495");
      albumesDeArtista.then(function(value) {
       value.forEach(album => console.log(album.titulo));
      }, function(reason) {
        console.log(reason); // Error!
      }); */

      /*  let todaslascanciones = cancionRepository.obtenerTodasLasCanciones(0,6);
      todaslascanciones.then(function(value) {
        value.forEach(cancion => console.log("TODAS LAS CANCIONES: "+ cancion.titulo));
       }, function(reason) {
         console.log(reason); // Error!
       }); */
 

      /*  let cancionPorId = cancionRepository.obtenerCancionPorId("243030c7-8767-4a42-a8c7-cba97a345519");
       cancionPorId.then(function(value){
                console.log("cancion por id : "+value.titulo);

       },function(reason){
        console.log(reason);
       });
 */
      /*  let cancionesPorNombre = cancionRepository.obtenerCancionPorNombre("afterlife",0,6);
       cancionesPorNombre.then(function(value) {
        value.forEach(cancion => console.log("CANCIONES  POR NOMBRE: "+ cancion.titulo));
       }, function(reason) {
         console.log(reason); // Error!
       }); */

      /*  let cancionesPorAlbum = cancionRepository.obtenerCancionPorAlbum("1",0,6);
       cancionesPorAlbum.then(function(value) {
                value.forEach(cancion => console.log("CANCIONES  POR ALBUM: "+ cancion.titulo));
       }, function(reason) {
         console.log(reason); // Error!
       }); */

       /* let cancionesDeListaDeReproduccion = cancionRepository.obtenerCancionesDeListaDeReproduccion(["1","9e972bdd-96c3-4350-b106-5fcd8160e9e6"]);
       cancionesDeListaDeReproduccion.then(function(value) {
                value.forEach(cancion => console.log("CANCIONES LISTAS DE REPRO: "+ cancion.titulo));
        }, function(reason) {
                console.log(reason); // Error!
        });
        */

       /*  let servicioartistas = new ServicioArtistas();
        let artista = new Artista();
        artista.id= uuidv4();
        artista.nombre = "aaron hernandez";
        artista.nombreArtistico = "Dream Theather";
        artista.nacionalidad = "Finlandes";
        artista.anoDeNacimiento=1999;
        artista.web="www.dreamtheater.com";
        artista.fkIdEstatus=1;
        servicioartistas.registrarArtista(artista); */

        console.log(process.env.TYPEORM_ENTITIES);
    //console.log("2"+__dirname); 
    console.log("corriendo en:  "+port);
    
});

