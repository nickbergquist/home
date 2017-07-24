using Microsoft.AspNetCore.Mvc;

namespace Nab.Controllers
{
    public class CodeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
