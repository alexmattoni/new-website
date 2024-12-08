using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Database.Models;

public enum VehicleType
{
    Vehicle5939 = 0,
    VehicleFR59 = 1
}

public class FuelLog
{
    [Key]
    public int Id { get; set; }
    
    // Who made the entry
    public required Guid Member { get; set; }
    [StringLength(50)]
    public required string MemberFirstName { get; set; }
    [StringLength(50)]
    public required string MemberLastName { get; set; }
    
    // When it was made
    public DateTime Time { get; set; }
    
    // Vehicle info, mileage, amount fueled
    public required VehicleType Vehicle { get; set; }
    [Column(TypeName = "decimal(5,2)")]
    public required decimal Amount { get; set; }
    [Column(TypeName = "decimal(12,2)")]
    public required decimal Mileage { get; set; }
}