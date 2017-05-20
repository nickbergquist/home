using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nab.Services
{
    /// <summary>
    /// E-mail service interface
    /// </summary>
    public interface IEmailService
    {
        Task SendEmailAsync(string senderName, string email, string subject, string message);
    }
}
