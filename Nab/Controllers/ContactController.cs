using Microsoft.AspNetCore.Mvc;
using Nab.Models.ViewModels;
using Nab.Services;
using System.Threading.Tasks;

namespace Nab.Controllers
{
    public class ContactController : Controller
    {
        private readonly IEmailService _emailService;

        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }
        
        [HttpGet]
        public IActionResult Index(bool success)
        {
            return View(new ContactForm(){ IsSent = false, IsPosted = false });
        }

        [HttpPost]
        public async Task<IActionResult> Index(ContactForm model)
        {
            // anti-spam : this variable should never be populated by a real user
            string honeyPot = model.UserEmail.Honeypot;

            if (string.IsNullOrEmpty(honeyPot))
            {
                if (ModelState.IsValid)
                {
                    model.IsPosted = true;

                    try
                    {
                        await _emailService.SendEmailAsync(model.UserEmail.SenderName, model.UserEmail.SenderEmailAddress.Trim(), model.UserEmail.EmailSubject, model.UserEmail.EmailMessage);
                        model.IsSent = true;
                    }
                    catch
                    {
                        model.IsSent = false;
                    }
                }
            }
            else
            {
                model.IsPosted = true;
                model.IsSent = false;
            }

            return View(model);
        }
    }
}
