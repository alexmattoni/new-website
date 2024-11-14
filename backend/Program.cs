using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add authentication based on appsettings.json
builder.Services.AddKeycloakWebApiAuthentication(builder.Configuration); 

// Add policies based on expected roles from Keycloak JWT
builder.Services.AddAuthorization(options =>
{
    // Add more as necessary and as we develop, make sure they match the token
    options.AddPolicy("admin", policy => policy.RequireRealmRoles("website-admin"));
}); 

// Boilerplate to build and use the auth
var app = builder.Build();
app.UseAuthentication(); 
app.UseAuthorization();

// Run the app
app.Run();