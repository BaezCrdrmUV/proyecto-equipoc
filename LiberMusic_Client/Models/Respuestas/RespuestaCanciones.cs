using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models.Respuestas
{
    public class RespuestaCanciones
    {
        public bool estatus { get; set; }
        public string mensaje { get; set; }
        public List<RespuestaCancionesMostrar> datos { get; set; }
        public string [] erroresDeGuardado { get; set; }
        public string[] erroresDeValidacion { get; set; }
    }
}
