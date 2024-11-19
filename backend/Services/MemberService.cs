using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models.Domain;
using backend.Models.Requests;

namespace backend.Services
{
    public class MemberService(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        : IMemberService
    {
        public async Task<Member> GetCurrentMemberAsync()
        {
            var keycloakId = httpContextAccessor.HttpContext?.User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(keycloakId))
                return null;
            
            return await GetMemberByKeycloakIdAsync(keycloakId);
        }

        public async Task<Member> GetMemberByKeycloakIdAsync(string keycloakId)
        {
            return await dbContext.Members
                .Include(m => m.Profile)
                .FirstOrDefaultAsync(m => m.KeycloakId == keycloakId);
        }

        public async Task<Member> GetMemberByIdAsync(Guid id)
        {
            return await dbContext.Members
                .Include(m => m.Profile)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<MemberProfile> UpdateProfileAsync(Guid memberId, UpdateProfileRequest request)
        {
            var profile = await dbContext.MemberProfiles
                .FirstOrDefaultAsync(p => p.MemberId == memberId);

            if (profile == null)
            {
                profile = new MemberProfile
                {
                    MemberId = memberId,
                    CreatedAt = DateTime.UtcNow
                };
                dbContext.MemberProfiles.Add(profile);
            }

            profile.FirstName = request.FirstName;
            profile.LastName = request.LastName;
            profile.PhoneNumber = request.PhoneNumber;
            profile.UpdatedAt = DateTime.UtcNow;

            await dbContext.SaveChangesAsync();
            return profile;
        }
    }
}