using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models.ModelosMandar
{
    public class UsuarioRegistrarMandar
    {
        public string nombreDeUsuario { get; set; }
        public string nombreDelPropietario{ get; set; }
        public int FKIdEstatus { get; set; }
        public Contrasena contrasena { get; set; }
        public DatosDeLocalizacion DatosDeLocalizacion { get; set; }

    }
}
