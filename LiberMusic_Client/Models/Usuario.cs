﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LiberMusic_Client.Models;

namespace LiberMusic_Client.Models
{
    public class Usuario
    {
        public string id { get; set; }
        public int?  fkIdArtista {get;set;}
        public string nombreDeUsuario { set; get; }
        public string nombreDelPropietario { set; get; }
        public int fkidEstatus { set; get; }
        public estatusderegistros? fkidEstatusNavigation{ set; get; }
        public DatosDeLocalizacion?  datosdelocalizacion{ set; get; }
        public Contrasena? contrasena { set; get; }
       
    }
}
