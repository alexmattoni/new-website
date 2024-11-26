using backend.Models.Enums;

namespace backend.DTO.FuelLog;

public class CreateFuelLogDto
{
    public VehicleType Vehicle { get; set; }
    public decimal Amount { get; set; }
    public decimal Mileage { get; set; }
}