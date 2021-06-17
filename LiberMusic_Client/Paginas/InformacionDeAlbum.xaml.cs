using LiberMusic_Client.Models;
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

namespace LiberMusic_Client.Paginas
{
    /// <summary>
    /// Lógica de interacción para InformacionDeAlbum.xaml
    /// </summary>
    public partial class InformacionDeAlbum : Page
    {
        private Album _album;
        public InformacionDeAlbum(Album album)
        {
            InitializeComponent();
            _album = album;
            this.DataContext = _album;
        }

        private void Regresar(object sender, RoutedEventArgs e)
        {
            NavigationService.GoBack();
        }
    }
}
