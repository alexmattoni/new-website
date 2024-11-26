using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Member> Members { get; set; }
    public DbSet<MemberProfile> MemberProfiles { get; set; }
    public DbSet<FuelLog> FuelLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<Member>().ToTable("members");
        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasIndex(e => e.KeycloakId).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<MemberProfile>().ToTable("memberprofiles");
        modelBuilder.Entity<MemberProfile>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<FuelLog>().ToTable("fuellogs");
        modelBuilder.Entity<FuelLog>().Property(f => f.vehicle)
            .HasConversion(
                v => v.ToString(),
                v => (VehicleType) Enum.Parse(typeof(VehicleType), v.Replace("-", "_")));
        modelBuilder.Entity<FuelLog>(entity =>
        {
            entity.Property(e => e.amount).HasColumnType("decimal(5,2)");
            entity.Property(e => e.mileage).HasColumnType("decimal(12,2)");
            entity.Property(e => e.time).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }
}