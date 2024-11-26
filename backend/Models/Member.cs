namespace backend.Models;

public class Member
{
    public Guid Id { get; set; }
    public string KeycloakId { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public MemberProfile Profile { get; set; }
    public ICollection<FuelLog> FuelLogs { get; set; }
}