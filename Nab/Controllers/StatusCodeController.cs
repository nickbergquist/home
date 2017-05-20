using Microsoft.AspNetCore.Mvc;

namespace Nab.Controllers
{
    public class StatusCodeController : Controller
    {
        // GET: /<controller>/
        [HttpGet("/StatusCode/{statusCode}")]
        public IActionResult Index(int statusCode)
        {
            return View(statusCode);
        }
    }
}
