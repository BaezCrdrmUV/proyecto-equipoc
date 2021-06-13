using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class ListasDeReproduccion
    {
        public int id { get; set; }
        public int MyProperty { get; set; }
        public string nombre { get; set; }
        public int numeroDeTracks { get; set; }
        public int fkIdEstatus { get; set; }
    }
}
