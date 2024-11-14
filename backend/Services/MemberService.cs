using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models.Domain;
using backend.Models.Requests;

namespace backend.Services
{
    public class MemberService : IMemberService
    {
        private readonly AppDbContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MemberService(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Member> GetCurrentMemberAsync()
        {
            var keycloakId = _httpContextAccessor.HttpContext?.User.FindFirst("sub")?.Value;
            
            if (string.IsNullOrEmpty(keycloakId))
                return null;

            return await GetMemberByKeycloakIdAsync(keycloakId);
        }

        public async Task<Member> GetMemberByKeycloakIdAsync(string keycloakId)
        {
            return await _dbContext.Members
                .Include(m => m.Profile)
                .FirstOrDefaultAsync(m => m.KeycloakId == keycloakId);
        }

        public async Task<Member> GetMemberByIdAsync(Guid id)
        {
            return await _dbContext.Members
                .Include(m => m.Profile)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<MemberProfile> UpdateProfileAsync(Guid memberId, UpdateProfileRequest request)
        {
            var profile = await _dbContext.MemberProfiles
                .FirstOrDefaultAsync(p => p.MemberId == memberId);

            if (profile == null)
            {
                profile = new MemberProfile
                {
                    MemberId = memberId,
                    CreatedAt = DateTime.UtcNow
                };
                _dbContext.MemberProfiles.Add(profile);
            }

            profile.FirstName = request.FirstName;
            profile.LastName = request.LastName;
            profile.PhoneNumber = request.PhoneNumber;
            profile.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return profile;
        }
    }
}