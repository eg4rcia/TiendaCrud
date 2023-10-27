using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaCrudTest.Entitys;

namespace TiendaCrudTest.Bussiness.Service
{
    public interface IClienteService
    {
        Task<bool> Insertar(Cliente modelo);
        Task<bool> Actualizar(Cliente modelo);
        Task<bool> Eliminar(int id);
        Task<Cliente> Obtener(int id);
        Task<IQueryable<Cliente>> ObtenerTodos();

        Task<Cliente> ObetenerClientearticulo(string NombreCliente);
         Task<IQueryable<Articulo>> ObtenerTodosart();

    }
}
