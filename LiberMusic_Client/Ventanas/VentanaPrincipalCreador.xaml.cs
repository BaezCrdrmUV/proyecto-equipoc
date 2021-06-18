using LiberMusic_Client.Models;
using LiberMusic_Client.Paginas;
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
using System.Windows.Shapes;

namespace LiberMusic_Client.Ventanas
{
    /// <summary>
    /// Lógica de interacción para VentanaPrincipalCreador.xaml
    /// </summary>
    public partial class VentanaPrincipalCreador : Window
    {
        private Usuario _usuarioSesion;
        private Artistas _artista;
        public VentanaPrincipalCreador(Usuario usuario, Artistas artista)
        {
            InitializeComponent();
            _usuarioSesion = usuario;
            PaginaFrameAdmin.Content = new PaginaBienvenidaUsuario(_usuarioSesion);
        }


        private void IrCuenta(object sender, RoutedEventArgs e)
        {
            PaginaFrameAdmin.Content = new Paginas.InfoCuenta(_usuarioSesion);
        }
    }
}
