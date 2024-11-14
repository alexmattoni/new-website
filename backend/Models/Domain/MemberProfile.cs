using System.ComponentModel.DataAnnotations;

namespace backend.Models.Domain
{
    public class MemberProfile
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid MemberId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation property
        public Member Member { get; set; }
    }
}