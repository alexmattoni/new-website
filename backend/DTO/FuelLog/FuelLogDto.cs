using backend.Models.Enums;

namespace backend.DTO.FuelLog;

public class FuelLogDto
{
    public int id { get; set; }
    public DateTime time { get; set; }
    public VehicleType vehicle { get; set; }
    public decimal amount { get; set; }
    public decimal mileage { get; set; }
}