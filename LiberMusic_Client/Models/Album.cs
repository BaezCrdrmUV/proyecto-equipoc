using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class Album
    {
        public string id { set; get; }
        public string fkIdArtista { set; get; }
        public string titulo { set; get; }
        public int duracion { get; set; }
        public int numeroDeTracks { get; set; }
        public string companiaProductora { get; set; }
        public string tipoDeAlbum { get; set; }
        public int anoDeLanzamiento { get; set; }
        public int fkIdEstatus { get; set; }
        public string portada { get; set; }
    }
}
