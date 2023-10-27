namespace TiendaCrudTest.Front.Models.ViewModels
{
    public partial class VMArticulo
    {
        public int Id { get; set; }
        public string Codigo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public double Precio { get; set; }
        public string Imagen { get; set; } = null!;
        public int Stock { get; set; }
    }
}
