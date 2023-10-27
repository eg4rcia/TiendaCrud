using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaCrudTest.Data.Repositories;
using TiendaCrudTest.Entitys;

namespace TiendaCrudTest.Bussiness.Service
{
    public class ClienteService : IClienteService
    {
        private readonly IGenericRepository<Cliente> _contactorepo;
        public ClienteService(IGenericRepository<Cliente> clienterepo)
        {
               _contactorepo = clienterepo;
        }
        public async Task<bool> Actualizar(Cliente modelo)
        {
          return await _contactorepo.Actualizar(modelo);
        }

        public async Task<bool> Eliminar(int id)
        {
          return await _contactorepo.Eliminar(id);
        }

        public async Task<bool> Insertar(Cliente modelo)
        {
            return await _contactorepo.Insertar(modelo);
        }

      

        public async Task<Cliente> Obtener(int id)
        {
            return await _contactorepo.Obtener(id);
        }
        public async Task<Cliente> ObetenerClientearticulo(string NombreCliente)
        {
            IQueryable<Cliente> queryClienteSQL = await _contactorepo.ObtenerTodos();
            Cliente cliente = queryClienteSQL.Where(c=> c.Nombre == NombreCliente).FirstOrDefault();;
            return cliente;
        }
        public async Task<IQueryable<Cliente>> ObtenerTodos()
        {
            return await _contactorepo.ObtenerTodos();
        }
        public async Task<IQueryable<Articulo>> ObtenerTodosart()
        {
            return await _contactorepo.ObtenerTodosart();
        }
    }
}
