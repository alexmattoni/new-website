using backend.Data;
using backend.DTO.Member;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/members")]
    //[Authorize(Roles = "Admin")] TODO add back admin auth
    public class MembersController(ApplicationDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers()
        {
            var members = await context.Members
                .Include(m => m.Profile)
                .Select(m => new MemberDto
                {
                    Id = m.Id,
                    KeycloakId = m.KeycloakId,
                    Email = m.Email,
                    FirstName = m.Profile.FirstName,
                    LastName = m.Profile.LastName,
                    PhoneNumber = m.Profile.PhoneNumber,
                    CreatedAt = m.CreatedAt,
                    UpdatedAt = m.UpdatedAt
                })
                .ToListAsync();

            return Ok(members);
        }

        [HttpPost]
        public async Task<ActionResult<MemberDto>> CreateMember(CreateMemberDto createMemberDto)
        {
            var member = new Member
            {
                KeycloakId = createMemberDto.KeycloakId,
                Email = createMemberDto.Email,
                Profile = new MemberProfile
                {
                    FirstName = createMemberDto.FirstName,
                    LastName = createMemberDto.LastName,
                    PhoneNumber = createMemberDto.PhoneNumber
                }
            };

            context.Members.Add(member);
            await context.SaveChangesAsync();

            var memberDto = new MemberDto
            {
                Id = member.Id,
                KeycloakId = member.KeycloakId,
                Email = member.Email,
                FirstName = member.Profile.FirstName,
                LastName = member.Profile.LastName,
                PhoneNumber = member.Profile.PhoneNumber,
                CreatedAt = member.CreatedAt,
                UpdatedAt = member.UpdatedAt
            };

            return CreatedAtAction(nameof(GetMember), new { id = member.Id }, memberDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetMember(Guid id)
        {
            var member = await context.Members
                .Include(m => m.Profile)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (member == null)
                return NotFound();

            var memberDto = new MemberDto
            {
                Id = member.Id,
                KeycloakId = member.KeycloakId,
                Email = member.Email,
                FirstName = member.Profile.FirstName,
                LastName = member.Profile.LastName,
                PhoneNumber = member.Profile.PhoneNumber,
                CreatedAt = member.CreatedAt,
                UpdatedAt = member.UpdatedAt
            };

            return Ok(memberDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(Guid id, UpdateMemberDto updateMemberDto)
        {
            var member = await context.Members
                .Include(m => m.Profile)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (member == null)
                return NotFound();

            member.Email = updateMemberDto.Email;
            member.Profile.FirstName = updateMemberDto.FirstName;
            member.Profile.LastName = updateMemberDto.LastName;
            member.Profile.PhoneNumber = updateMemberDto.PhoneNumber;

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(Guid id)
        {
            var member = await context.Members.FindAsync(id);
            if (member == null)
                return NotFound();

            context.Members.Remove(member);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}