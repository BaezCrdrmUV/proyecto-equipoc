using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MSSuscripcion.Validations
{
    class ValidadorUsuarios:IValidadorGenerico,IValidadorFechas
    {
        public static string REGEX_UBICACION = "^([a-zA-z0-9]+\\s?)+$";
        public static string REGEX_MATRICULA_BUSQUEDA = "^S[0-9]{1,8}$";
        public static string REGEX_NOMBRE_DE_USUARIO = "^([a-zA-zñ_\\-0-9]{8,200})$";
        public static string REGEX_NOMBRE = "^([a-zA-zñ]+\\s{1,3})+[a-zA-Zñ]+\\s{0,3}$";
        public static string REGEX_NOMBRE_ORGANIZACION = "^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$";
        public static string REGEX_TEXTOS = "^([a-zA-z0-9ñ,\\.]+\\s{1,3})+[a-zA-Zñ0-9,\\.]+\\s{0,3}(\\\\r\\\\)?$";
        public static string REGEX_NOMBRE_BUSQUEDA = "^([a-zA-zñ]+\\s{1,3})*[a-zA-Zñ]+\\s{0,3}$";
        public static string REGEX_TIPO_DE_PROYECTO = "^([a-zA-zñ]+\\s{0,3})+[a-zA-Z]+\\s{0,3}$";
        public static string REGEX_ESTUDIANTES_NECESARIOS = "^([a-zA-z]+\\s{0,3})+[a-zA-Z]+\\s{0,3}$";
        public static string REGEX_NUMERICA = "^[0-9]+$";
        public static string REGEX_EMAIL = "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
        public static string REGEX_CONTRASENA = "^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,200}$";
        public static string REGEX_FECHA = "^[0-9]{1,2}\\/[0-9]{1,2}\\/[0-9]{2,}\\s?[0-9]{1,2}:[0-9]{2}:[0-9]{2}\\s?[a|A|p|P]\\.\\s?[m|M]\\.$";
        public bool validarEntero(int valor, string regex)
        {
            string valorEnString = valor + "";
            bool validacionPatron = Regex.IsMatch(valorEnString, regex, RegexOptions.None, TimeSpan.FromMilliseconds(300));
            bool validacionLongitud = valor > int.MaxValue
                                    ? false
                                    : true;

            return validacionPatron && validacionLongitud;

        }
        public bool validarByte(int valor, string regex)
        {
            string valorEnString = valor + "";
            bool validacionPatron = Regex.IsMatch(valorEnString, regex, RegexOptions.None, TimeSpan.FromMilliseconds(300));
            bool validacionLongitud = valor > byte.MaxValue
                                    ? false
                                    : true;

            return validacionPatron && validacionLongitud;

        }

        public bool validarNombre(string valor, string regex)
        {
            bool vaidacionLongitud = valor.Length > 100
                                   ? false
                                   : true;
            bool validacionPatron = Regex.IsMatch(valor, regex, RegexOptions.None, TimeSpan.FromMilliseconds(900));

            return vaidacionLongitud && validacionPatron;
        }

       

        public bool validarTexto(string valor, string regex)
        {
            bool vaidacionLongitud = valor.Length > 1000
                                   ? false
                                   : true;
            bool validacionPatron = Regex.IsMatch(valor, regex, RegexOptions.None, TimeSpan.FromMilliseconds(900));

            return vaidacionLongitud && validacionPatron;
        }

        public bool validarFecha(string valor, string regex)
        {
            bool validacionPatron = Regex.IsMatch(valor, regex, RegexOptions.None, TimeSpan.FromMilliseconds(300));
            return validacionPatron;
        }
    }
}
