using backend.Models.Enums;

namespace backend.Models;

public class FuelLog
{
    public int id { get; set; }
    public Guid memberid { get; set; }
    public DateTime time { get; set; }
    public VehicleType vehicle { get; set; }
    public decimal amount { get; set; }
    public decimal mileage { get; set; }
    public Member member { get; set; }
}