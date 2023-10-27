using System;
using System.Collections.Generic;

namespace TiendaCrudTest.Entitys
{
    public partial class Tienda
    {
        public int Id { get; set; }
        public string Sucursal { get; set; } = null!;
        public string Direccion { get; set; } = null!;
    }
}
