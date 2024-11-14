using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Domain;
using backend.Models.Requests;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]  // Requires authentication for all endpoints
    public class MemberController : ControllerBase
    {
        private readonly IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet("me")]
        public async Task<ActionResult<Member>> GetCurrentMember()
        {
            var member = await _memberService.GetCurrentMemberAsync();
            if (member == null)
                return NotFound();

            return Ok(member);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(Guid id)
        {
            var member = await _memberService.GetMemberByIdAsync(id);
            if (member == null)
                return NotFound();

            return Ok(member);
        }

        [HttpPut("me/profile")]
        public async Task<ActionResult<MemberProfile>> UpdateProfile(UpdateProfileRequest request)
        {
            var member = await _memberService.GetCurrentMemberAsync();
            if (member == null)
                return NotFound();

            var updatedProfile = await _memberService.UpdateProfileAsync(member.Id, request);
            return Ok(updatedProfile);
        }
    }
}