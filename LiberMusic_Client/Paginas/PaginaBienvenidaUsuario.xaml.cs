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
    /// Lógica de interacción para PaginaBienvenidaUsuario.xaml
    /// </summary>
    public partial class PaginaBienvenidaUsuario : Page
    {
        private Usuario _usuario;
        public PaginaBienvenidaUsuario(Usuario usuario)
        {
            this._usuario = usuario;
            this.DataContext = usuario;
            InitializeComponent();
        }
    }
}
