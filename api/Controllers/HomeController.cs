using Microsoft.AspNetCore.Mvc;

namespace WebEksamenSub1.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}