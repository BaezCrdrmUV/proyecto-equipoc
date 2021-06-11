using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models.Respuestas
{
    class RespuestaArtista
    {
        public bool estatus { get; set; }
        public string mensaje { get; set; }
        public Artistas datos { get; set; }
        public string[] errores { get; set; }
    }
}
