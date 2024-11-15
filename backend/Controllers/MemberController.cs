using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Domain;
using backend.Models.Requests;
using backend.Services;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/members")]
    [Authorize]  // Requires authentication for all endpoints
    public class MemberController(IMemberService memberService) : ControllerBase
    {
        [HttpGet("me")]
        public async Task<ActionResult<Member>> GetCurrentMember()
        {
            var member = await memberService.GetCurrentMemberAsync();
            if (member == null)
                return NotFound();

            return Ok(member);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(Guid id)
        {
            var member = await memberService.GetMemberByIdAsync(id);
            if (member == null)
                return NotFound();

            return Ok(member);
        }

        [HttpPut("me/profile")]
        public async Task<ActionResult<MemberProfile>> UpdateProfile(UpdateProfileRequest request)
        {
            var member = await memberService.GetCurrentMemberAsync();
            if (member == null)
                return NotFound();

            var updatedProfile = await memberService.UpdateProfileAsync(member.Id, request);
            return Ok(updatedProfile);
        }
    }
}