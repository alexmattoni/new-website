using System.ComponentModel.DataAnnotations;

namespace backend.Models.Domain
{
    public class Member
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string KeycloakId { get; set; }

        [Required]
        public string Email { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation property
        public MemberProfile Profile { get; set; }
    }
}