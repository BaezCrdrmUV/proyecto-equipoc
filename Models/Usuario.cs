using System;
using System.Collections.Generic;

#nullable disable

namespace MSSuscripcion.Models
{
    public partial class Usuario
    {
        public string Id { get; set; }
        public uint? FkIdArtista { get; set; }
        public string NombreDeUsuario { get; set; }
        public string NombreDelPropietario { get; set; }
        public uint FkidEstatus { get; set; }

        public virtual Estatusderegistro FkidEstatusNavigation { get; set; }
        public virtual Contrasena Contrasena { get; set; }
        public virtual Datosdelocalizacion Datosdelocalizacion { get; set; }
    }
}
