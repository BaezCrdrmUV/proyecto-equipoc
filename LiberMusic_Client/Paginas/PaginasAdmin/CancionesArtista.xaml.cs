using LiberMusic_Client.Models;
using LiberMusic_Client.Models.Respuestas;
using LiberMusic_Client.Utilities;
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

namespace LiberMusic_Client.Paginas.PaginasAdmin
{
    /// <summary>
    /// Lógica de interacción para CancionesArtista.xaml
    /// </summary>
    public partial class CancionesArtista : Page
    {
        private List<RespuestaCancionesMostrar> _lista;
        private Usuario _usuarioSesion;
        private Artistas _ArtistaSesion;
        public CancionesArtista(Usuario usuario, Artistas artista)
        {
            InitializeComponent();
            _ArtistaSesion = artista;
            _usuarioSesion = usuario;
            LlenarLista();
        }


        private async void LlenarLista()
        {


            Conexiones conexion = new Conexiones();

            List<RespuestaCancionesMostrar> lista = await conexion.ObtenerCancionesArtista(_ArtistaSesion.nombre);
            ListaCanciones.ItemsSource = lista;
            _lista = lista;


        }

        private void ReproducirCancion(object sender, RoutedEventArgs e)
        {

            NavigationService.Navigate(new ReproducirCancion(_lista));
        }



    }
}
