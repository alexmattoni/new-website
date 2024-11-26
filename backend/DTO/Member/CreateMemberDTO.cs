namespace backend.DTO.Member;

public class CreateMemberDto
{
    public string KeycloakId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
}