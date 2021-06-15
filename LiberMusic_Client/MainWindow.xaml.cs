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
using LiberMusic_Client.Utilities;
using LiberMusic_Client.Ventanas;

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

        private async void doLogin(object sender, RoutedEventArgs e)
        {
            btnIngresar.IsEnabled = false;
        //Activar Pantalla de carga
           Conexiones conexion = new Conexiones();
            try
            {
                Usuario ususarioconsultado = await conexion.HacerLogin(txtUsuario.Text, txtPassword.Password);

                if (ususarioconsultado.id !=null)
                {
                    if (ususarioconsultado.fkIdArtista == null)
                    {
                        Ventanas.VentanaPrincipal ventana = new Ventanas.VentanaPrincipal(ususarioconsultado);
                        ventana.Show();
                        this.Close();

                    }
                    else {
                        Ventanas.VentanaPrincipalCreador ventana = new Ventanas.VentanaPrincipalCreador(ususarioconsultado);
                        ventana.Show();
                        this.Close();
                    }
                   
                }
                else
                {

                    MessageBox.Show("No encontramos el usuario");
                    btnIngresar.IsEnabled = true;
                }
            }
            catch (Exception ecepcioncachada)
            {

                MessageBox.Show("ocurrió un error al realizar el proceso de login");
            }
            finally {
                btnIngresar.IsEnabled = true;
                txtPassword.Clear();
                txtUsuario.Clear();
            }

        }



        private  void RegistrarUsuario(object sender, RoutedEventArgs e)
        {
            TipoUsuario ventanatipo = new TipoUsuario();
            ventanatipo.Show();
            this.Close();

        }


        }



}

