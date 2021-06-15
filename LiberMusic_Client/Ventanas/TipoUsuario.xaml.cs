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
using LiberMusic_Client.Ventanas.VentanasInteraccion;

namespace LiberMusic_Client.Ventanas
{
    /// <summary>
    /// Lógica de interacción para TipoUsuario.xaml
    /// </summary>
    public partial class TipoUsuario : Window
    {
        public TipoUsuario()
        {
            InitializeComponent();
        }

        private void Cancelar(object sender, RoutedEventArgs e)
        {

        }
        private void Continuar(object sender, RoutedEventArgs e)
        {
            if (ComboTipo.SelectedIndex != -1)
            {
                if (ComboTipo.SelectedIndex == 0)
                {

                    RegistrarUsuarioArtista ventanaRegistrar = new RegistrarUsuarioArtista();
                    ventanaRegistrar.Show();
                    this.Close();

                }
                else
                {
                    RegistrarUsuario ventanaRegistrar = new RegistrarUsuario();
                    ventanaRegistrar.Show();
                    this.Close();

                }
            }
            else {

                VentanaInteraccion interaccion = new VentanaInteraccion("Error","No puede dejar en blanco el tipo de registro");
                interaccion.Show();
            
            }

        }
    }
}
