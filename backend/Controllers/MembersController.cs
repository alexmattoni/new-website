using backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/members")]
    public class MembersController(AppDbContext context) : ControllerBase
    {
        
    }
}