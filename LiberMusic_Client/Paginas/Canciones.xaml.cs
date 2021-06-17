using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Navigation;
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
using LiberMusic_Client.Ventanas.VentanasInteraccion;
namespace LiberMusic_Client.Paginas
{
    /// <summary>
    /// Lógica de interacción para Canciones.xaml
    /// </summary>
    public partial class Canciones : Page
    {
        private List<RespuestaCancionesMostrar> _lista;
        private Usuario _usuarioSesion;
        public Canciones(Usuario usuario)
        {
            InitializeComponent();
            _usuarioSesion = usuario;
            LlenarLista();
          
      

         
        }



        private async void LlenarLista() {


            Conexiones conexion = new Conexiones();

            List<RespuestaCancionesMostrar> lista = await conexion.ObtenerCanciones();
            ListaCanciones.ItemsSource = lista;
            _lista = lista;


        }

        private void ReproducirCancion(object sender, RoutedEventArgs e)
        {

            NavigationService.Navigate(new ReproducirCancion(_lista));
        }


        private async void ConsultarAlbum(object sender, RoutedEventArgs e)
        {
            try
            {
                Conexiones conexion = new Conexiones();
                RespuestaCancionesMostrar cancionSeleccionada = new RespuestaCancionesMostrar();
                cancionSeleccionada = (RespuestaCancionesMostrar)ListaCanciones.SelectedItem;
                Album album = await conexion.ObtenerAlbumNombre(cancionSeleccionada.nombreAlbum);
                NavigationService.Navigate(new InformacionDeAlbum(album));
            }
            catch (Exception) {
                VentanaInteraccion ventana = new VentanaInteraccion("Exito", "Se registró con exito, puede regresar al login");
                ventana.Show();
            }
        }


    }
}
