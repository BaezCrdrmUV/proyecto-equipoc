﻿using LiberMusic_Client.Models.Respuestas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiberMusic_Client.Models
{
    public class RespuestasUsuario
    {
        public bool estatus { get; set; }
        public string mensaje { get; set; }
        public DatosRespuestaUsuario datos { get; set; }
        public string[] errores { get; set; }



    }
}
