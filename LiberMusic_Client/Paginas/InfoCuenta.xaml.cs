using LiberMusic_Client.Models;
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

namespace LiberMusic_Client.Paginas
{
    /// <summary>
    /// Lógica de interacción para InfoCuenta.xaml
    /// </summary>
    public partial class InfoCuenta : Page
    {
        private Usuario _usuarioSesion;
        public InfoCuenta(Usuario usuario)
        {
            this._usuarioSesion = usuario;
            InitializeComponent();
            this.DataContext = _usuarioSesion;
        }

        private void ActualizarUsuario(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new ActualizarInformacion(_usuarioSesion));
        }
        private void Regresar(object sender, RoutedEventArgs e)
        {
            NavigationService.GoBack();
        }
    }
}
