namespace backend.DTO.Member;

public class MemberDto
{
    public Guid Id { get; set; }
    public string KeycloakId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}