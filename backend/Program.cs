using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add debug logging
builder.Services.AddLogging(options =>
{
    options.AddConsole();
    options.AddDebug();
    options.AddConfiguration(builder.Configuration.GetSection("Logging"));
    options.SetMinimumLevel(LogLevel.Information);
});

// Add authentication based on appsettings.json
builder.Services.AddKeycloakWebApiAuthentication(builder.Configuration); 

// Add policies based on expected roles from Keycloak JWT
builder.Services.AddAuthorization(options =>
{
    // Add more as necessary and as we develop, make sure they match the token
    options.AddPolicy("admin", policy => policy.RequireRealmRoles("website-admin"));
});

var programPolicy = "_programPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: programPolicy, policy =>
    {
        policy.WithOrigins("http://localhost:4200");
        policy.AllowAnyHeader();
        policy.AllowAnyOrigin();
        
        // Change to domain for prod
        policy.SetIsOriginAllowed(host => true);
    });
});

// Boilerplate to build and use the auth
var app = builder.Build();
app.UseAuthentication(); 
app.UseAuthorization();
app.UseCors(programPolicy);

// Run the app
app.Run();