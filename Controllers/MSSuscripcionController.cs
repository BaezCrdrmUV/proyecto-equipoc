using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MSSuscripcion.Models;
using MSSuscripcion.Validations;
using MSSuscripcion.Utilities;

namespace MSSuscripcion.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SuscripcionController : ControllerBase
    {
        private libermusicUsuariosContext dbContext;
      
        public SuscripcionController() 
        {
            dbContext = new libermusicUsuariosContext();
        }

        [HttpGet("login")]
        public async Task<ActionResult<Usuario>> login([FromBody]Usuario usuarioP = null)
        {
            Usuario usuario = null;
            if(String.IsNullOrEmpty(usuarioP.NombreDeUsuario)||String.IsNullOrEmpty( usuarioP.Contrasena.Contrasena1) ){
                return BadRequest("No se han ingresado todos los campos");
            }

            
            ValidadorUsuarios validadorUsuarios = new ValidadorUsuarios();
            bool resultadoValidacion = validadorUsuarios.validarNombre(usuarioP.NombreDeUsuario,ValidadorUsuarios.REGEX_NOMBRE_DE_USUARIO);
            
            
            if(resultadoValidacion == false){
               return BadRequest("Datos introducidos no validos"); 
            }
            
            string contrasenacifrada = Cifrador.cifrarsha256(usuarioP.Contrasena.Contrasena1);
             usuario = await dbContext.Usuarios.Include(user => user.Contrasena)
                    .Where(user => (user.NombreDeUsuario.Equals(usuarioP.NombreDeUsuario)) 
                                && (user.Contrasena.Contrasena1.Equals(Cifrador.cifrarsha256(usuarioP.Contrasena.Contrasena1)))
                          )
                          .FirstOrDefaultAsync();
                if (usuario == null){            
                    return BadRequest("Usuario y o contraseña incorrectos");
                }
                usuario.Contrasena = null;
                return Ok(usuario);      
        }

        [HttpPost("RegistrarUsuario")]
        public async Task<ActionResult<Usuario>> Add([FromBody]Usuario usuario)
        {
            if(usuario == null)
            {   
                return BadRequest("No has introducidos datos");
            }
           
            
            ValidadorUsuarios validadorUsuarios = new ValidadorUsuarios();
            bool resultadoValidacion = validadorUsuarios.validarNombre(usuario.NombreDeUsuario,ValidadorUsuarios.REGEX_NOMBRE_DE_USUARIO)
                                    && validadorUsuarios.validarNombre(usuario.NombreDelPropietario,ValidadorUsuarios.REGEX_NOMBRE)
                                    && validadorUsuarios.validarNombre(usuario.Contrasena.Contrasena1,ValidadorUsuarios.REGEX_CONTRASENA)
                                    && validadorUsuarios.validarNombre(usuario.Datosdelocalizacion.Email,ValidadorUsuarios.REGEX_EMAIL);
            
         if(resultadoValidacion == false){
                  return BadRequest("Datos introducidos no validos"); 
                }
        
             usuario.Id =Guid.NewGuid().ToString();
             usuario.Contrasena.FkIdUsuario =usuario.Id;
             usuario.Contrasena.Contrasena1= Cifrador.cifrarsha256(usuario.Contrasena.Contrasena1);
             usuario.Datosdelocalizacion.FkIdUsuario = usuario.Id;
             Datosdelocalizacion nuevosDatosDeLocaliacion = usuario.Datosdelocalizacion;
             Contrasena nuevaContrasena = usuario.Contrasena; 
         
            try
            {
                dbContext.Entry(usuario).State = EntityState.Added;
                dbContext.Entry(nuevaContrasena).State = EntityState.Added;
                dbContext.Entry(nuevosDatosDeLocaliacion).State = EntityState.Added;
                await dbContext.SaveChangesAsync();
                usuario.Contrasena=null;
                usuario.Datosdelocalizacion = null;
                return Created("", usuario);
               
            }
            catch (Exception ex)
            {
       
                return BadRequest("Error al registrarte"+"\n"+ex);
            }
            
        }

        [HttpPut("actualizarUsuario")]
        public async Task<ActionResult<Usuario>> update([FromBody]Usuario usuario)
        {
            if(usuario == null)
            {
                return BadRequest("La peticion no contiene datos");
            }
            
            ValidadorUsuarios validadorUsuarios = new ValidadorUsuarios();
            bool resultadoValidacion = validadorUsuarios.validarNombre(usuario.NombreDeUsuario,ValidadorUsuarios.REGEX_NOMBRE_DE_USUARIO)
                                    && validadorUsuarios.validarNombre(usuario.NombreDelPropietario,ValidadorUsuarios.REGEX_NOMBRE)
                                    && validadorUsuarios.validarNombre(usuario.Contrasena.Contrasena1,ValidadorUsuarios.REGEX_CONTRASENA)
                                    && validadorUsuarios.validarNombre(usuario.Datosdelocalizacion.Email,ValidadorUsuarios.REGEX_EMAIL);
            
            try
            {   
                if(resultadoValidacion == true){
                    var usuarioDesdeBd = dbContext.Usuarios
                                        .Include(usuario => usuario.Contrasena)
                                        .Include(usuario => usuario.Datosdelocalizacion)
                                        .SingleOrDefault(c => c.Id == usuario.Id);
                    
                    if(usuarioDesdeBd != null){
                        usuarioDesdeBd.NombreDeUsuario = usuario.NombreDeUsuario;
                        usuarioDesdeBd.NombreDelPropietario = usuario.NombreDelPropietario;
                        // se cirfra la contraseña que viene en la peticion
                        usuario.Contrasena.Contrasena1 =Cifrador.cifrarsha256(usuario.Contrasena.Contrasena1);
                        //se asigna la nueva contrasena ya cifrada
                        usuarioDesdeBd.Contrasena = usuario.Contrasena;
                        usuarioDesdeBd.Datosdelocalizacion.Email = usuario.Datosdelocalizacion.Email;
                        usuarioDesdeBd.Datosdelocalizacion.Pais = usuario.Datosdelocalizacion.Pais;
                        usuarioDesdeBd.FkidEstatus = usuario.FkidEstatus;
                        dbContext.Entry(usuarioDesdeBd).State = EntityState.Modified;
                        await dbContext.SaveChangesAsync();
                        usuarioDesdeBd.Contrasena = null;
                        usuarioDesdeBd.Datosdelocalizacion = null;
                        return Ok(usuarioDesdeBd);
                    
                    
                    }else{
                        return BadRequest("Ese usuario no existe");                    
                    }
                    
                }else{
                    return BadRequest("Datos introducidos no validos");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("error al actualizar tus datos"+"\n"+ex);
            }
        }
    }
}