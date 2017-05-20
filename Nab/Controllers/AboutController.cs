using Microsoft.AspNetCore.Mvc;

namespace Nab.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
