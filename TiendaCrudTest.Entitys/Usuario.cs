using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaCrudTest.Entitys
{
    public class Usuario
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Clave { get; set; }

        [NotMapped]
        public bool MantenerActivo { get; set; }
    }
}
