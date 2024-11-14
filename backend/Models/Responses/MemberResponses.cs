namespace backend.Models.Responses
{
    public class MemberResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public ProfileResponse Profile { get; set; }
    }
    
    public class ProfileResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
    }
}