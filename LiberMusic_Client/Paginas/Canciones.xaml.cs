using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using LiberMusic_Client.Models;
using LiberMusic_Client.Models.Respuestas;
using LiberMusic_Client.Properties;
using LiberMusic_Client.Utilities;
namespace LiberMusic_Client.Paginas
{
    /// <summary>
    /// Lógica de interacción para Canciones.xaml
    /// </summary>
    public partial class Canciones : Page
    {
        private Usuario _usuarioSesion;
        public Canciones(Usuario usuario)
        {
            InitializeComponent();
            LlenarLista();
          
      

         
        }



        private async void LlenarLista() {


            Conexiones conexion = new Conexiones();

            List<RespuestaCancionesMostrar> lista = await conexion.ObtenerCanciones();
            ListaCanciones.ItemsSource = lista;


        }
    }
}
