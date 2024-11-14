using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests
{
    public class UpdateProfileRequest
    {
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        [Phone]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }
    }
}