using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Nab.Services;
using Nab.Settings;
using System;

namespace Nab
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("securesettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRouting(options => options.LowercaseUrls = true);
            
            // Add framework services.
            services.AddMvc();

            // HTTP compression
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = System.IO.Compression.CompressionLevel.Optimal);

            services.AddResponseCompression(options =>
            {
                options.MimeTypes = new[]
                {
                    "image/svg+xml"
                };
            });

            //
            if (Configuration.GetSection("Email") != null)
            {
                services.Configure<EmailSettings>(Configuration.GetSection("Email"));
            }

            // Register the interface and implementation email service class so that each 
            // time a IEmailService is requested, a MessageServices instance is delivered.
            services.AddTransient<IEmailService, MessageServices>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseResponseCompression(); // won't work on an AWS S3 host without using Cloudflare CDN as request header "Accept-Encoding: gzip" is ignored

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = content =>
                {
                    // cache
                    const int timeInSeconds = 60 * 60 * 24 * 30;
                    var headers = content.Context.Response.GetTypedHeaders();
                    headers.CacheControl = new CacheControlHeaderValue()
                    {
                        MaxAge = TimeSpan.FromSeconds(timeInSeconds),
                    };

                    // pre-compressed gzip files created in gulpfile.js - set response headers to let the user-agent 
                    // know how to decode in order to obtain the media-type referenced by the Content-Type header
                    if (content.File.Name.EndsWith(".gz.min.css"))
                    {
                        content.Context.Response.Headers["Content-Type"] = "text/css";
                        content.Context.Response.Headers["Content-Encoding"] = "gzip";
                    }

                    if (content.File.Name.EndsWith(".gz.min.js"))
                    {
                        content.Context.Response.Headers["Content-Type"] = "text/javascript";
                        content.Context.Response.Headers["Content-Encoding"] = "gzip";
                    }
                }
            });

            // extension method of UseStatusCodePages() middleware returns error status code and executes handler for the redirect URL
            app.UseStatusCodePagesWithReExecute("/StatusCode/{0}");

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
