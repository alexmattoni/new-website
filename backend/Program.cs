using backend.Data;
using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

// Add debug logging
builder.Logging.AddConsole();
builder.Services.AddLogging(options =>
{
    options.AddConsole();
    options.AddDebug();
    options.AddConfiguration(builder.Configuration.GetSection("Logging"));
    options.SetMinimumLevel(LogLevel.Information);
});

// Add services to the container.
builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add authentication based on appsettings.json
builder.Services.AddKeycloakWebApiAuthentication(builder.Configuration); 

// Add policies based on expected roles from Keycloak JWT
builder.Services.AddAuthorization(options =>
{
    // Add more as necessary and as we develop, make sure they match the token
    options.AddPolicy("admin", policy => policy.RequireRealmRoles("website-admin"));
});

// Add Cors policy
const string corsPolicy = "programPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policyConf =>
    {
        policyConf.WithOrigins("http://localhost:4200", "https://localhost:4200")
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyHeader()
            .AllowCredentials()
            .AllowAnyMethod();
    });
});

// App middleware build---order matters!
var app = builder.Build();
//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Add CORS
app.UseCors(corsPolicy);

// Add auth stuff
app.UseAuthentication();
app.UseAuthorization();

// Map controllers last
app.MapControllers();
app.MapGet("/", () => "Connection OK");

// Run the app
app.Run();