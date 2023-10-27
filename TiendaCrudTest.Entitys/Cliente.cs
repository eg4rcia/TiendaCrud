using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TiendaCrudTest.Entitys
{
    public partial class Cliente
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Direccion { get; set; } = null!;
    }
}
