using System.Security.Claims;
using backend.Data;
using backend.DTO.FuelLog;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/fuel")]
    [Authorize]
    public class FuelLogController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FuelLogDto>>> GetFuelLogs()
        {
            var fuelLogs = await context.FuelLogs
                .Include(f => f.member)
                .OrderByDescending(f => f.time)
                .Select(f => new FuelLogDto
                {
                    id = f.id,
                    time = f.time,
                    vehicle = f.vehicle,
                    amount = f.amount,
                    mileage = f.mileage
                })
                .ToListAsync();

            return Ok(fuelLogs);
        }

        [HttpPost]
        public async Task<ActionResult<FuelLogDto>> CreateFuelLog(CreateFuelLogDto createFuelLogDto)
        {
            // to do creation logic
            return null;
        }
    }
}