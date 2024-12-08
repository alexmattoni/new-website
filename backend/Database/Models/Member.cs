using System.ComponentModel.DataAnnotations;

namespace backend.Database.Models;

public class Member
{
    [Key]
    public Guid Id { get; set; }
    public Guid KeycloakId { get; set; }
    [MaxLength(50)]
    public required string Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public MemberProfile Profile { get; set; }
}