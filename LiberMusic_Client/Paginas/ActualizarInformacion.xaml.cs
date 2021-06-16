using LiberMusic_Client.Models;
using LiberMusic_Client.Models.ModelosMandar;
using LiberMusic_Client.Utilities;
using LiberMusic_Client.Ventanas.VentanasInteraccion;
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
    /// Lógica de interacción para ActualizarInformacion.xaml
    /// </summary>
    public partial class ActualizarInformacion : Page
    {
        private Usuario _usuarioSesion;
        public ActualizarInformacion(Usuario usuario)
        {
            InitializeComponent();
        }

        private async void Actualizar(object sender, RoutedEventArgs e)
        {
            if (Password.Password.Equals(PasswordRepite.Password))
            {

                UsuarioActualizarMandar usuarioMandar = new UsuarioActualizarMandar();
                Contrasena contrasena = new Contrasena();
                DatosDeLocalizacion localizacion = new DatosDeLocalizacion();

                usuarioMandar.id = _usuarioSesion.id; 
                usuarioMandar.nombreDeUsuario = txtNombreUsuario.Text;
                usuarioMandar.nombreDelPropietario = txtNombre.Text;
                usuarioMandar.FKIdEstatus = 1;
                contrasena.contrasena1 = Password.Password;
                contrasena.fkIdUsuario = _usuarioSesion.id;

                usuarioMandar.contrasena = contrasena;
                localizacion.Email = Correo.Text;
                localizacion.Pais = txtPais.Text;
                localizacion.FKIdUsuario = "";
                usuarioMandar.DatosDeLocalizacion = localizacion;

                Conexiones nuevaconexion = new Conexiones();
                String mensaje = await nuevaconexion.ActualizarUsuario(usuarioMandar);

                if (mensaje.Equals("Usuario registrado con exito"))
                {

                    VentanaInteraccion ventana = new VentanaInteraccion("Exito", "Se actualizó con exito");
                    ventana.Show();
                    NavigationService.GoBack();

                }
                else
                {
                    VentanaInteraccion ventana = new VentanaInteraccion("error", "algo pasó");
                    ventana.Show();
                }

            }
            else
            {
                VentanaInteraccion ventana = new VentanaInteraccion("Error", "Las contraseñas no coinciden");
                ventana.Show();

            }



        }
    }
}
