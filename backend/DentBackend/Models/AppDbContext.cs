using Microsoft.EntityFrameworkCore;

namespace DentBackend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<StaffMember> StaffMembers { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<DentalChartEntry> DentalChartEntries { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
    }
}
