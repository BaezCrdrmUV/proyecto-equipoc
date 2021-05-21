using System;
using System.Collections.Generic;

#nullable disable

namespace MSSuscripcion.Models
{
    public partial class Contrasena
    {
        public string Contrasena1 { get; set; }
        public string FkIdUsuario { get; set; }

        public virtual Usuario FkIdUsuarioNavigation { get; set; }
    }
}
