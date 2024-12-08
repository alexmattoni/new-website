using backend.Database;
using backend.Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/fuel")]
    [Authorize]
    public class FuelLogController(AppDbContext context, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        // Request for adding fuel entry
        public class AddFuelLogRequest
        {
            public Guid MemberId { get; set; }
            public VehicleType Vehicle { get; set; }
            public decimal Amount { get; set; }
            public decimal Mileage { get; set; }
        }

        // Get request returns the latest 300 fuel entries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FuelLog>>> GetLatest()
        {
            return await context.FuelLogs
                .OrderByDescending(f => f.Time)
                .Take(300)
                .ToListAsync();
        }

        // Post to add a fuel entry
        [HttpPost]
        public async Task<ActionResult<FuelLog>> AddEntry([FromBody] AddFuelLogRequest request)
        {
            // Get the member adding the entry
            var member = await context.Members
                .Include(m => m.Profile)
                .FirstOrDefaultAsync(m => m.KeycloakId == request.MemberId);

            // Return error if it can't find the member making the request
            if (member == null)
                return NotFound("Member not found");

            // Adds the entry
            var fuelLog = new FuelLog
            {
                Member = member.KeycloakId,
                MemberFirstName = member.Profile?.FirstName ?? "",
                MemberLastName = member.Profile?.LastName ?? "",
                Time = DateTime.UtcNow,
                Vehicle = request.Vehicle,
                Amount = request.Amount,
                Mileage = request.Mileage
            };
            context.FuelLogs.Add(fuelLog);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLatest), new { id = fuelLog.Id }, fuelLog);
        }
    }
}