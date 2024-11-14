using backend.Models.Domain;
using backend.Models.Requests;

namespace backend.Services
{
    public interface IMemberService
    {
        Task<Member> GetCurrentMemberAsync();
        Task<Member> GetMemberByKeycloakIdAsync(string keycloakId);
        Task<Member> GetMemberByIdAsync(Guid id);
        Task<MemberProfile> UpdateProfileAsync(Guid memberId, UpdateProfileRequest request);
    }
}