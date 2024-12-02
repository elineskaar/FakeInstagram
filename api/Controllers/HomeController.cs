using Microsoft.AspNetCore.Mvc;

namespace WebEksamenSub1.Controllers
{
    public class HomeController : Controller
    {
       
        public IActionResult Index()
        {
            return View();
        }
    }
}