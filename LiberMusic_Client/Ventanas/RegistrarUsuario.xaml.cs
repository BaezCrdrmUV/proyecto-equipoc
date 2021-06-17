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
using LiberMusic_Client.Models;
using LiberMusic_Client.Models.ModelosMandar;
using LiberMusic_Client.Utilities;
using LiberMusic_Client.Ventanas.VentanasInteraccion;

namespace LiberMusic_Client.Ventanas
{
    /// <summary>
    /// Lógica de interacción para RegistrarUsuario.xaml
    /// </summary>
    public partial class RegistrarUsuario : Window
    {
        public RegistrarUsuario()
        {
            InitializeComponent();
        }

        private async void Registrar(object sender, RoutedEventArgs e)
        {
            try
            {
                if (Password.Password.Equals(PasswordRepite.Password))
                {

                    UsuarioRegistrarMandar usuarioMandar = new UsuarioRegistrarMandar();
                    Contrasena contrasena = new Contrasena();
                    DatosDeLocalizacion localizacion = new DatosDeLocalizacion();


                    usuarioMandar.nombreDeUsuario = txtNombreUsuario.Text;
                    usuarioMandar.nombreDelPropietario = txtNombre.Text;
                    usuarioMandar.FKIdEstatus = 1;
                    contrasena.Contrasena1 = Password.Password;
                    contrasena.FkIdUsuario = "";

                    usuarioMandar.contrasena = contrasena;
                    localizacion.Email = Correo.Text;
                    localizacion.Pais = txtPais.Text;
                    localizacion.FKIdUsuario = "";
                    usuarioMandar.DatosDeLocalizacion = localizacion;
                    Conexiones nuevaconexion = new Conexiones();

                    String mensaje = await nuevaconexion.RegistrarUsuario(usuarioMandar);



                    if (mensaje.Equals("operacion registrada  con exito"))
                    {

                        VentanaInteraccion ventana = new VentanaInteraccion("Exito", "Se registró con exito, puede regresar al login");
                        ventana.Show();
                        MainWindow login = new MainWindow();
                        login.Show();
                        this.Close();

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
            catch (Exception ex){
                VentanaInteraccion ventana = new VentanaInteraccion("error", "algo pasó con la conexion y la respuesta");
                ventana.Show();
            }
           




        }



        public bool VerificarCampos() {

            return true;
        }
    }
}
