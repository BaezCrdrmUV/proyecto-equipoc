using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class Usuario
    {
        public string id { get; set; }
        public int?  fkIdArtista {get;set;}
        public string nombreDeUsuario { set; get; }
        public string nombreDelPropietario { set; get; }
        public int FKIdEstatus { set; get; }
        public estatusderegistros? fkidEstatusNavigation{ set; get; }
        public DatosDeLocalizacion?  DatosDeLocalizacion{ set; get; }
        public Contrasena? contrasena { set; get; }
    }
}
