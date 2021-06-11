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
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Net.Mime;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace LiberMusic_Client
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void doLogin(object sender, RoutedEventArgs e)
        {
            btnIngresar.IsEnabled = false;
            //Activar Pantalla de carga
            hacerLogin(txtUsuario.Text, txtPassword.Password);

        }




        private async void hacerLogin(string usuario, string password) {

            try
            {
                usuarioLogin usuarioL = new usuarioLogin();
                usuarioL.nombreDeUsuario = txtUsuario.Text;
                Contrasena contrasena = new Contrasena();
                contrasena.Contrasena1 = txtPassword.Password;
                usuarioL.contrasena = contrasena;
                string usuarioserializado = JsonSerializer.Serialize(usuarioL);
                HttpClient conexionApi = new HttpClient();
                HttpContent contenido = new StringContent(usuarioserializado,Encoding.UTF8, "application/json");
                var response = await conexionApi.PostAsync(
                        "http://localhost:4003/LoginApi/doLogin", contenido);
                    response.EnsureSuccessStatusCode();
                if (response.IsSuccessStatusCode) {
                    var result = await response.Content.ReadAsStringAsync();

                }

            }
            catch (Exception e)
            {

                MessageBox.Show("Si caigo aquí el davis es puto");
            }
            finally {
                btnIngresar.IsEnabled = true;
            }

        }

    }


    public class usuarioLogin {
        public string nombreDeUsuario {set;get;}
        public Contrasena contrasena { set; get; }
    }
    public class Contrasena { 
        public string Contrasena1 { set; get; }
    }

}

