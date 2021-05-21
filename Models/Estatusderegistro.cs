using System;
using System.Collections.Generic;

#nullable disable

namespace MSSuscripcion.Models
{
    public partial class Estatusderegistro
    {
        public Estatusderegistro()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public uint Id { get; set; }
        public string NombreDeEstatus { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
