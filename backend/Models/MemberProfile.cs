namespace backend.Models;

public class MemberProfile
{
    public Guid Id { get; set; }
    public Guid MemberId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Member Member { get; set; }
}