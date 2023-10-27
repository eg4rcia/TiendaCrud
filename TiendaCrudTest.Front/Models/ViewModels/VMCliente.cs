using System.ComponentModel.DataAnnotations;

namespace TiendaCrudTest.Front.Models.ViewModels
{
    public class VMCliente
    {
            [Key]
            public int Id { get; set; }
            public string? Nombre { get; set; } 
            public string? Apellidos { get; set; } 
            public string? Direccion { get; set; } 
        
    }
}
