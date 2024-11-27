using Microsoft.EntityFrameworkCore;
using WebEksamenSub1.DAL;
using Serilog;
using Serilog.Events;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PostDbContext>(options =>{
    options.UseSqlite(
        builder.Configuration["ConnectionStrings:PostDbContextConnection"]);
});


builder.Services.AddControllers().AddNewtonsoftJson(Options =>{
    Options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    Options.SerializerSettings.ContractResolver = new DefaultContractResolver();
});
builder.Services.AddCors(options => {
    options.AddPolicy("CorsPolicy",
    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});


builder.Services.AddScoped<IPostRepository, PostRepository>();

var loggerConfiguration = new LoggerConfiguration()
.MinimumLevel.Information()
.WriteTo.File($"APILogs/app_{DateTime.Now:yyyMMdd_HHmmss}.log")
.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var values) && e.Level == LogEventLevel.Information &&
            e.MessageTemplate.Text.Contains("Executed DbCommand"));

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    DBInit.Seed(app);
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy");
app.MapControllerRoute(name: "api", pattern: "{controller}/{action=Index}/{id?}");
app.Run();


