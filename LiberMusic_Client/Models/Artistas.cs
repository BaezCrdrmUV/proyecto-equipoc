using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class Artistas
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string nombreArtistico { get; set; }
        public string anoDeNacimiento { get; set; }
        public string web { get; set; }
        public string nacionalidad { get; set; }
        public int fkIdEstatus { get; set; }
    }
}
