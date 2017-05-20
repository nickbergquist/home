using Microsoft.AspNetCore.Mvc;
using Nab.Settings;

namespace Nab.Controllers
{
    [Route("[controller]")]
    public class WorkController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Name property of Route attribute exposes available route name in Razor view
        [Route("liberte-de-expression", Name = RouteNames.LibertedExpression)]
        public IActionResult LibertedExpression()
        {
            return View();
        }
    }
}
