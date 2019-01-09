using Microsoft.AspNetCore.Mvc;
using Nab.Settings;

namespace Nab.Controllers
{
    [Route("[controller]")]
    public class CodeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Name property of Route attribute exposes available route name in Razor view
        [Route("node-express-gulp-build", Name = RouteNames.NodeExpressGulpBuild)]
        public IActionResult NodeExpressGulpBuild()
        {
            return View();
        }

        //[Route("angularjs-thing", Name = RouteNames.AngularJSThing)]
        //public IActionResult AngularJSThing()
        //{
        //    return View();
        //}
    }
}
