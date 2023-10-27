using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Reflection.Metadata.Ecma335;
using TiendaCrudTest.Bussiness.Service;
using TiendaCrudTest.Entitys;
using TiendaCrudTest.Front.Models;
using TiendaCrudTest.Front.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace TiendaCrudTest.Front.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly IClienteService _clienteService;

        public HomeController(IClienteService clienteService)
        {
           _clienteService= clienteService;
        }
        public async Task<IActionResult> salir() {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Cuenta");
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult TiendaCarrito()
        {
            return View();
        }


        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            IQueryable<Cliente> queryClienteSQL = await _clienteService.ObtenerTodos();
            List<VMCliente> lista = queryClienteSQL
                                    .Select(c => new VMCliente(){
                    Id = c.Id,
                    Nombre = c.Nombre,
                    Apellidos = c.Apellidos,
                    Direccion = c.Direccion
                }).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);

        }

        [HttpPost]
        public async Task <IActionResult> Insertar([FromBody] VMCliente modelo)
        {
            Cliente NuevoModelo = new Cliente()
            {
                Id = modelo.Id,
                Nombre = modelo.Nombre,
                Apellidos = modelo.Apellidos,
                Direccion = modelo.Direccion
            };

            bool respuesta = await _clienteService.Insertar(NuevoModelo);
            return StatusCode(StatusCodes.Status200OK, new { valor = respuesta });
        }


        [HttpPut]
        public async Task<IActionResult> Actualizar([FromBody] VMCliente modelo)
        {
            Cliente NuevoModelo = new Cliente()
            {

                Id= modelo.Id,
                Nombre = modelo.Nombre,
                Apellidos = modelo.Apellidos,
                Direccion = modelo.Direccion
            };

            bool respuesta = await _clienteService.Actualizar(NuevoModelo);
            return StatusCode(StatusCodes.Status200OK, new { valor = respuesta });
        }


        [HttpDelete]
        public async Task<IActionResult> Eliminar(int id)
        {
        

            bool respuesta = await _clienteService.Eliminar(id);
            return StatusCode(StatusCodes.Status200OK, new { valor = respuesta });
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}