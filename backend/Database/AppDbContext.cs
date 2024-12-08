using System.Reflection;
using backend.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Member stuff
    public DbSet<Member> Members { get; set; }
    public DbSet<MemberProfile> MemberProfiles { get; set; }
    
    // Event/game stuff
    
    // Fuel stuff
    public DbSet<FuelLog> FuelLogs { get; set; }

    // QA stuff

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .UseSnakeCaseNamingConvention()
            .LogTo(Console.WriteLine, LogLevel.Information);  // Log SQL queries to console;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure Member
        modelBuilder.Entity<Member>()
            .HasIndex(m => m.KeycloakId)
            .IsUnique();
        modelBuilder.Entity<Member>()
            .HasIndex(m => m.Email)
            .IsUnique();

        // Configure MemberProfile
        modelBuilder.Entity<MemberProfile>()
            .HasOne(p => p.Member)
            .WithOne(m => m.Profile)
            .HasForeignKey<MemberProfile>(p => p.MemberId)
            .HasPrincipalKey<Member>(m => m.KeycloakId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure FuelLog
        modelBuilder.Entity<FuelLog>()
            .Property(f => f.Vehicle)
            .HasConversion<int>();
    }
}