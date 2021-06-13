using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class Album
    {
        public int id { set; get; }
        public int fkIdArista { set; get; }
        public string titulo { set; get; }
        public string duracion { get; set; }
        public int numeroDeTracks { get; set; }
        public string companiaProductora { get; set; }
        public DateTime fechaDeLanzamiento { get; set; }
        public int fkIdEstatus { get; set; }
    }
}
