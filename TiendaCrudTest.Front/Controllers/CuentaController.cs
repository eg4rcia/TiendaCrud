using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Security.Claims;
using TiendaCrudTest.Data.DataContext;
using TiendaCrudTest.Entitys;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;



namespace TiendaCrudTest.Front.Controllers
{
    public class CuentaController : Controller
    {
        //13:05
        private readonly Contexto _contexto;

        public CuentaController(Contexto contexto)
        {
                _contexto = contexto;
        }
        public IActionResult Login()
        {
            ClaimsPrincipal c = HttpContext.User;
            if (c.Identity != null)
            {
                if (c.Identity.IsAuthenticated)
                {
                    return RedirectToAction("Index", "Home");
                }


            }
            return View();
        }




        [HttpPost]
        public async Task<ActionResult> Login(Usuario u)
        {
            try
            {
                using (SqlConnection con = new(_contexto.Conexion))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_validar_usuario", con))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add("@UserName", System.Data.SqlDbType.VarChar).Value = u.UserName;
                        cmd.Parameters.Add("@Clave", System.Data.SqlDbType.VarChar).Value = u.Clave;
                        con.Open();
                        var dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            if (dr["UserName"] != null && u.UserName != null)
                            {
                                List<Claim> c = new List<Claim>()
                            {
                            new Claim(ClaimTypes.NameIdentifier, u.UserName)

                            };
                                ClaimsIdentity ci = new(c, CookieAuthenticationDefaults.AuthenticationScheme);
                                AuthenticationProperties p = new();
                                p.AllowRefresh = true;
                                p.IsPersistent = u.MantenerActivo;


                                if (u.MantenerActivo)
                                {
                                    p.ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(1);
                                }
                                else
                                {
                                    p.ExpiresUtc = DateTimeOffset.UtcNow.AddDays(1);
                                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(ci), p);
                                    return RedirectToAction("Index", "Home");
                                }


                            }
                            else
                            {
                                ViewBag.Error = "Credenciales incorrectas o cuenta no registrada";
                            }
                        }
                        con.Close();
                    }
                   // return View();
                }
                return View();
            }
            catch (System.Exception e)
            {

                ViewBag.Error = e.Message;
                return View();
            }

        }

        //public async Task<ActionResult> Login(Usuario u)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(_contexto.Conexion))
        //        {

        //            using (SqlCommand cmd = new SqlCommand("sp_validar_usuario", con))
        //            {
        //                cmd.CommandType = System.Data.CommandType.StoredProcedure;
        //                cmd.Parameters.Add("@UserName", System.Data.SqlDbType.VarChar).Value = u.UserName;
        //                cmd.Parameters.Add("@Clave", System.Data.SqlDbType.VarChar).Value = u.Clave;
        //                con.Open();
        //                using (var dr = await cmd.ExecuteReaderAsync())
        //                {
        //                    if (await dr.ReadAsync())
        //                    {

        //                        string dbUserName = dr["UserName"].ToString();
        //                        if (dbUserName == u.UserName)
        //                        {
        //                            List<Claim> claims = new List<Claim>
        //                    {
        //                        new Claim(ClaimTypes.NameIdentifier, u.UserName)
        //                    };
        //                            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        //                            var authProperties = new AuthenticationProperties
        //                            {
        //                                AllowRefresh = true,
        //                                IsPersistent = u.MantenerActivo
        //                            };

        //                            if (u.MantenerActivo)
        //                            {
        //                                authProperties.ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(1);
        //                            }
        //                            else
        //                            {
        //                                authProperties.ExpiresUtc = DateTimeOffset.UtcNow.AddDays(1);
        //                            }

        //                            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), authProperties);
        //                            return RedirectToAction("Index", "Home");
        //                        }
        //                    }
        //                }


        //                ViewBag.Error = "Credenciales incorrectas o cuenta no registrada.";
        //            }
        //        }

        //        return View();
        //    }
        //    catch (Exception e)
        //    {
        //        ViewBag.Error = e.Message;
        //        return View();
        //    }
        //}





















    }
}
