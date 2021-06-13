using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class CancionesListaReproduccion
    {
        public int id { get; set; }
        public int fkIdCancion { get; set; }
        public int fkIdListaDeReproduccion { get; set; }
        public int fkIdEstatus { get; set; }
    }
}
