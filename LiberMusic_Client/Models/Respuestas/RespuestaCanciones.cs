﻿using System;
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
        public Canciones datos { get; set; }
        public string[] errores { get; set; }
    }
}
