using LiberMusic_Client.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using LiberMusic_Client.Models.ModelosMandar;

namespace LiberMusic_Client.Utilities
{
    public class Conexiones
    {
        public Usuario usuarioEncontrado;
        public async Task<Usuario> HacerLogin(string nombre, string password)
        {

            Usuario usuarioencontrado = new Usuario();

            usuarioLogin usuarioL = new usuarioLogin();
            usuarioL.nombreDeUsuario = nombre;
            ContrasenaMandar contrasena = new ContrasenaMandar();
            contrasena.contrasena1 = password;
            usuarioL.contrasena = contrasena;
            string usuarioserializado = JsonSerializer.Serialize(usuarioL);
            HttpClient conexionApi = new HttpClient();
            HttpContent contenido = new StringContent(usuarioserializado, Encoding.UTF8, "application/json");
            var response = await conexionApi.PostAsync(
                    "http://localhost:4004/LoginApi/doLogin", contenido);
            if (response.IsSuccessStatusCode)
            {
                var resultadoleido = await response.Content.ReadAsStringAsync();
                var respuestaDeserializada = JsonSerializer.Deserialize<RespuestasUsuario>(resultadoleido);
                if (respuestaDeserializada.estatus)
                {

                    return usuarioEncontrado = respuestaDeserializada.datos;


                }
            }
            else
            {
                return usuarioencontrado;
            }

            return usuarioencontrado;
        }


        public async Task<String> RegistrarUsuario(UsuarioRegistrarMandar usuarioL)
        {
            string respuesta ="";
            string usuarioserializado = JsonSerializer.Serialize(usuarioL);
            HttpClient conexionApi = new HttpClient();
            HttpContent contenido = new StringContent(usuarioserializado, Encoding.UTF8, "application/json");
            var response = await conexionApi.PostAsync(
                    "http://localhost:4004/Registrar/RegistrarUsuario", contenido);
            if (response.IsSuccessStatusCode)
            {
                var resultadoleido = await response.Content.ReadAsStringAsync();
                var respuestaDeserializada = JsonSerializer.Deserialize<RespuestasUsuario>(resultadoleido);
                if (respuestaDeserializada.estatus)
                {

                    return respuesta = respuestaDeserializada.mensaje;


                }
            }
            else
            {
                return respuesta;
            }

            return respuesta;
        }


        public async Task<String> ActualizarUsuario(Usuario usuarioL)
        {


            string respuesta = "";
            string usuarioserializado = JsonSerializer.Serialize(usuarioL);
            HttpClient conexionApi = new HttpClient();
            HttpContent contenido = new StringContent(usuarioserializado, Encoding.UTF8, "application/json");
            var response = await conexionApi.PutAsync(
                    "http://localhost:4004/Actualizar/ActualizarUsuario", contenido);
            if (response.IsSuccessStatusCode)
            {
                var resultadoleido = await response.Content.ReadAsStringAsync();
                var respuestaDeserializada = JsonSerializer.Deserialize<RespuestasUsuario>(resultadoleido);
                if (respuestaDeserializada.estatus)
                {

                    return respuesta = respuestaDeserializada.mensaje;


                }
            }
            else
            {
                return respuesta;
            }

            return respuesta;

        }



        }
}
