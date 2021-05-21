using System.Security.Cryptography;
using System.Text;

namespace MSSuscripcion.Utilities{
        public class Cifrador{
                public static string cifrarsha256(string cadena){
                        SHA256 sha256 = SHA256Managed.Create();
                        ASCIIEncoding encoding = new ASCIIEncoding();
                        byte[] stream = null;
                        StringBuilder sbuilder = new StringBuilder();
                        stream = sha256.ComputeHash(encoding.GetBytes(cadena));
                        for(int i=0; i < stream.Length;i++){
                                sbuilder.AppendFormat("{0:x2}",stream[i]);
                        }
                        return sbuilder.ToString();

                }

        }
}