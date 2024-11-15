using backend.Data;
using backend.Services;
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
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IMemberService, MemberService>();

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

// Boilerplate to build and use the auth
var app = builder.Build();

// Order of these matters!
app.UseCors(corsPolicy);
app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();
app.MapControllers();

// Run the app
app.Run();