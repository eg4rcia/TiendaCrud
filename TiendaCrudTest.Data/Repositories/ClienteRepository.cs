using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaCrudTest.Data.DataContext;
using TiendaCrudTest.Entitys;

namespace TiendaCrudTest.Data.Repositories
{
    public class ClienteRepository : IGenericRepository<Cliente>
    {
        private readonly TiendaTestContext _dbcontext;
       
        public ClienteRepository(TiendaTestContext context)
        {
            _dbcontext = context;
        }
        public async Task<bool> Actualizar(Cliente modelo)
        {
            _dbcontext.Clientes.Update(modelo);
            await _dbcontext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Eliminar(int id)
        {
            Cliente modelo = _dbcontext.Clientes.First(c => c.Id == id);
            _dbcontext.Clientes.Remove(modelo);
            await _dbcontext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Insertar(Cliente modelo)
        {
           _dbcontext.Clientes.Add(modelo);
            await _dbcontext.SaveChangesAsync();
            return true;
        }

        public async Task<Cliente> Obtener(int id)
        {
            return await _dbcontext.Clientes.FindAsync(id);
        }

        public async Task<IQueryable<Cliente>> ObtenerTodos()
        {
            IQueryable<Cliente> queryClienteSql = _dbcontext.Clientes;
            return queryClienteSql;
        }
        public async Task<IQueryable<Articulo>> ObtenerTodosart()
        {
            IQueryable<Articulo> queryClienteSql = _dbcontext.Articulos;
            return queryClienteSql;
        }
    }
}
