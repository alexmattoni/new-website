using System.ComponentModel.DataAnnotations;

namespace backend.Database.Models;

public class MemberProfile
{
    [Key]
    public required Guid Id { get; set; }
    public required Guid MemberId { get; set; }
    [MaxLength(50)]
    public required string FirstName { get; set; }
    [MaxLength(50)]
    public required string LastName { get; set; }
    [MaxLength(20)]
    public required int PhoneNumber { get; set; }
    [MaxLength(40)]
    public required string Address { get; set; }
    [MaxLength(20)]
    public required string City { get; set; }
    [MaxLength(2)]
    public required string State { get; set; }
    [MaxLength(5)]
    public required string ZipCode { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public Member Member { get; set; }
}