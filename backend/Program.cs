using Keycloak.AuthServices.Authentication; 

var builder = WebApplication.CreateBuilder(args);

// Add dev tools
builder.Services.AddEndpointsApiExplorer().AddSwaggerGen();

// Add authentication based on appsettings.json
builder.Services.AddKeycloakWebApiAuthentication(builder.Configuration); 

// Add policies based on expected roles from Keycloak JWT
builder.Services.AddAuthorization(options =>
{
    // Add more as necessary and as we develop, make sure they match the token
    options.AddPolicy("Admin", policy => policy.RequireRole("website-admin"));
}); 

// Boilerplate to build and use the auth
var app = builder.Build();
app.UseAuthentication(); 
app.UseAuthorization();
app.UseSwagger().UseSwaggerUI();
    
// Add the routes
app.MapGet("/", () => "Hello World!").RequireAuthorization();

// Run the app
app.Run();