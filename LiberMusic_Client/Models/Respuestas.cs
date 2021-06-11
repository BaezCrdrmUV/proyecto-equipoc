using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class Respuestas
    {
        public bool estatus { get; set; }
        public string mensaje { get; set; }
        public string datos { get; set; }
        public Exception[] errores { get; set; }



    }
}
