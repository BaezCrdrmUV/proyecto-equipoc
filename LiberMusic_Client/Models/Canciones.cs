using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class Canciones
    {
        public int id { get; set; }
        public int fkIdAlbum { get; set; }
        public string titulo { get; set; }
        public int numeroDeTrack { get; set; }
        public string genero { get; set; }
        public int duracion { get; set; }
        public int contenidoExplicito { get; set; }
        public int fkIdEstatus { get; set; }
    }
}
