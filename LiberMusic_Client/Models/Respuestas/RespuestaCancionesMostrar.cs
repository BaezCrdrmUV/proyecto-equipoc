using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models.Respuestas
{
    public class RespuestaCancionesMostrar
    {
        public string idCancion { get; set; }
        public int fkIAlbum { get; set; }
        public string nombreAlbum { get; set; }
        public string nombreArtista { get; set; }
        public string urlPortada { get; set; }
        public string tituloCancion { get; set; }
        public int duracion { get; set; }
        public int numeroDeTrack { get; set; }
        public string urlDeCancion { get; set; }
    }
}
