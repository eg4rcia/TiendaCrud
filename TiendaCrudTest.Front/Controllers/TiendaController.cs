using Microsoft.AspNetCore.Mvc;
using TiendaCrudTest.Bussiness.Service;
using TiendaCrudTest.Entitys;
using TiendaCrudTest.Front.Models.ViewModels;

namespace TiendaCrudTest.Front.Controllers
{
    public class TiendaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private readonly IClienteService _clienteService;
        public TiendaController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        public IActionResult Tienda()
        {
           
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            IQueryable<Articulo> queryClienteSQL = (IQueryable<Articulo>)await _clienteService.ObtenerTodosart();
            List<VMArticulo> lista = queryClienteSQL
                                    .Select(c => new VMArticulo()
                                    {
                                        Id = c.Id,
                                        Descripcion = c.Descripcion,
                                        Imagen= c.Imagen,
                                        Codigo = c.Codigo,
                                        Precio = c.Precio
                                    }).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);

        }
    }
}
