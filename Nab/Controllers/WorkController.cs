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

        [Route("rail-europe", Name = RouteNames.RailEurope)]
        public IActionResult RailEurope()
        {
            return View();
        }

        [Route("telegraph-subscriptions", Name = RouteNames.TelegraphSubs)]
        public IActionResult TelegraphSubs()
        {
            return View();
        }

        [Route("gcr-rst", Name = RouteNames.GcrRst)]
        public IActionResult GcrRst()
        {
            return View();
        }

        [Route("nthc", Name = RouteNames.Nthc)]
        public IActionResult Nthc()
        {
            return View();
        }

        [Route("london-management-admin", Name = RouteNames.LmAdmin)]
        public IActionResult LmAdmin()
        {
            return View();
        }

        [Route("datamonitor-kc-prototype", Name = RouteNames.DmKcProto)]
        public IActionResult DmKcProto()
        {
            return View();
        }

        [Route("tesco-property-market", Name = RouteNames.Tpm)]
        public IActionResult Tpm()
        {
            return View();
        }

        [Route("marketline", Name = RouteNames.Marketline)]
        public IActionResult Marketline()
        {
            return View();
        }

        [Route("datamonitor-kcs", Name = RouteNames.DmKcs)]
        public IActionResult DmKcs()
        {
            return View();
        }

        [Route("the-pod", Name = RouteNames.ThePod)]
        public IActionResult ThePod()
        {
            return View();
        }

        [Route("corporate-tools", Name = RouteNames.CorpTools)]
        public IActionResult CorpTools()
        {
            return View();
        }
    }
}
