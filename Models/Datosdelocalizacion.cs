using System;
using System.Collections.Generic;

#nullable disable

namespace MSSuscripcion.Models
{
    public partial class Datosdelocalizacion
    {
        public string Email { get; set; }
        public string Pais { get; set; }
        public string FkIdUsuario { get; set; }

        public virtual Usuario FkIdUsuarioNavigation { get; set; }
    }
}
