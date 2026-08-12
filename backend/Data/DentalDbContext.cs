using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;
using backend.Models;

namespace backend.Data;

public class DentalDbContext : DbContext
{
    public DentalDbContext(DbContextOptions<DentalDbContext> options) : base(options)
    {
    }

    public DbSet<AdaCode> AdaCodes => Set<AdaCode>();
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<VisitNote> VisitNotes => Set<VisitNote>();
    public DbSet<XRay> XRays => Set<XRay>();
    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<StaffMember> StaffMembers => Set<StaffMember>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<TreatmentCategory> TreatmentCategories => Set<TreatmentCategory>();
    public DbSet<FollowUp> FollowUps => Set<FollowUp>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        // Value converters for JSON serialization
        var insuranceConverter = new ValueConverter<InsuranceDetails, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<InsuranceDetails>(v, options) ?? new()
        );

        var medicalAlertsConverter = new ValueConverter<List<string>, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<List<string>>(v, options) ?? new()
        );

        var chartConverter = new ValueConverter<Dictionary<string, ToothChartItem>, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<Dictionary<string, ToothChartItem>>(v, options) ?? new()
        );

        var treatmentPlanConverter = new ValueConverter<List<TreatmentPlanItem>, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<List<TreatmentPlanItem>>(v, options) ?? new()
        );

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.Property(p => p.Insurance)
                .HasConversion(insuranceConverter)
                .HasColumnType("longtext");

            entity.Property(p => p.MedicalAlerts)
                .HasConversion(medicalAlertsConverter)
                .HasColumnType("longtext");

            entity.Property(p => p.Chart)
                .HasConversion(chartConverter)
                .HasColumnType("longtext");

            entity.Property(p => p.TreatmentPlan)
                .HasConversion(treatmentPlanConverter)
                .HasColumnType("longtext");
        });
    }

    public static void SeedData(DentalDbContext context)
    {
        context.Database.EnsureCreated();

        if (!context.AdaCodes.Any())
        {
            context.AdaCodes.AddRange(new List<AdaCode>
            {
                new() { Code = "D0120", Name = "Periodic Oral Evaluation", Category = "Diagnostic", Price = 65 },
                new() { Code = "D0220", Name = "Intraoral Radiograph (Periapical)", Category = "Diagnostic", Price = 45 },
                new() { Code = "D0274", Name = "Bitewing Radiographs (4 images)", Category = "Diagnostic", Price = 85 },
                new() { Code = "D1110", Name = "Prophylaxis (Adult Cleaning)", Category = "Preventive", Price = 95 },
                new() { Code = "D1208", Name = "Topical Application of Fluoride", Category = "Preventive", Price = 40 },
                new() { Code = "D2391", Name = "Resin Composite - 1 Surface (Posterior)", Category = "Restorative", Price = 185 },
                new() { Code = "D2393", Name = "Resin Composite - 3 Surfaces (Posterior)", Category = "Restorative", Price = 260 },
                new() { Code = "D2740", Name = "Crown - Porcelain/Ceramic", Category = "Restorative", Price = 1250 },
                new() { Code = "D3330", Name = "Endodontic Therapy (Molar RCT)", Category = "Endodontic", Price = 980 },
                new() { Code = "D4341", Name = "Periodontal Scaling & Root Planing", Category = "Periodontal", Price = 210 },
                new() { Code = "D6010", Name = "Surgical Placement of Implant Body", Category = "Implant", Price = 2400 },
                new() { Code = "D7140", Name = "Extraction - Erupted Tooth/Exposed Root", Category = "Oral Surgery", Price = 220 }
            });
            context.SaveChanges();
        }

        if (!context.Patients.Any())
        {
            var p1 = new Patient
            {
                Id = "P-101",
                Name = "Eleanor Vance",
                Age = 34,
                Gender = "Female",
                Phone = "(555) 123-4567",
                Email = "eleanor.vance@example.com",
                Address = "742 Evergreen Terrace, Springfield",
                Insurance = new InsuranceDetails
                {
                    Provider = "Delta Dental PPO",
                    PolicyNumber = "DD-98721A",
                    CoveragePercent = 80,
                    DeductibleMet = true
                },
                MedicalAlerts = new List<string> { "Penicillin Allergy", "Low Blood Pressure" },
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["3"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "occlusal", "distal" }
                    },
                    ["14"] = new()
                    {
                        Condition = "filling",
                        Surfaces = new() { "occlusal" },
                        Treatments = new() { new() { Type = "filling", Date = "2025-11-14", Code = "D2391", Notes = "Amalgam replaced with composite" } }
                    },
                    ["19"] = new()
                    {
                        Condition = "crown",
                        Surfaces = new() { "all" },
                        Treatments = new() { new() { Type = "crown", Date = "2026-01-20", Code = "D2740", Notes = "Porcelain crown placed on 19" } }
                    },
                    ["32"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2024-05-10", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-1", Code = "D0220", Name = "Intraoral Radiograph (Periapical)", Tooth = "3", Price = 45, Status = "approved" },
                    new() { Id = "tp-2", Code = "D2393", Name = "Resin Composite - 3 Surfaces (Posterior)", Tooth = "3", Price = 260, Status = "planned" }
                }
            };

            var p2 = new Patient
            {
                Id = "P-102",
                Name = "Marcus Sterling",
                Age = 48,
                Gender = "Male",
                Phone = "(555) 987-6543",
                Email = "marcus.s@example.com",
                Address = "1012 Baker St, London District",
                Insurance = new InsuranceDetails
                {
                    Provider = "Cigna Dental Premium",
                    PolicyNumber = "CIG-88219B",
                    CoveragePercent = 90,
                    DeductibleMet = true
                },
                MedicalAlerts = new List<string> { "Hypertension", "Aspirin Sensitivity" },
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["8"] = new()
                    {
                        Condition = "fracture",
                        Surfaces = new() { "incisal" }
                    },
                    ["30"] = new()
                    {
                        Condition = "rct",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "rct", Date = "2025-08-04", Code = "D3330", Notes = "Root canal performed by Dr. Aris" } }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-3", Code = "D2740", Name = "Crown - Porcelain/Ceramic", Tooth = "8", Price = 1250, Status = "planned" }
                }
            };

            var p3 = new Patient
            {
                Id = "P-103",
                Name = "Chloe Park",
                Age = 22,
                Gender = "Female",
                Phone = "(555) 456-7890",
                Email = "chloe.p@example.com",
                Address = "456 University Way, Berkeley",
                Insurance = new InsuranceDetails
                {
                    Provider = "MetLife Dental",
                    PolicyNumber = "MET-44102C",
                    CoveragePercent = 70,
                    DeductibleMet = false
                },
                MedicalAlerts = new List<string>(),
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["17"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted due to impaction" } }
                    },
                    ["18"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    },
                    ["31"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    },
                    ["32"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-6", Code = "D1110", Name = "Prophylaxis (Adult Cleaning)", Tooth = "General", Price = 95, Status = "planned" }
                }
            };

            var p4 = new Patient
            {
                Id = "P-104",
                Name = "Samuel Henderson",
                Age = 62,
                Gender = "Male",
                Phone = "(555) 789-0123",
                Email = "sam.h@example.com",
                Address = "89 Main St, North Andover",
                Insurance = new InsuranceDetails
                {
                    Provider = "Aetna Dental PPO",
                    PolicyNumber = "AET-10293D",
                    CoveragePercent = 50,
                    DeductibleMet = true
                },
                MedicalAlerts = new List<string> { "Type 2 Diabetes", "Takes Blood Thinners" },
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["12"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "mesial", "buccal" }
                    },
                    ["20"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "occlusal" }
                    },
                    ["21"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "lingual" }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-4", Code = "D2391", Name = "Resin Composite - 1 Surface (Posterior)", Tooth = "12", Price = 185, Status = "planned" },
                    new() { Id = "tp-5", Code = "D2391", Name = "Resin Composite - 1 Surface (Posterior)", Tooth = "20", Price = 185, Status = "planned" }
                }
            };

            context.Patients.AddRange(p1, p2, p3, p4);
            context.SaveChanges();

            // Seed XRays
            context.XRays.AddRange(new List<XRay>
            {
                new() { Id = "xr-1", PatientId = "P-101", Label = "Left Bitewing (14, 15, 16)", Date = "2026-03-12", Type = "bitewing" },
                new() { Id = "xr-2", PatientId = "P-101", Label = "Lower Right Periapical (30, 31)", Date = "2026-03-12", Type = "periapical" },
                new() { Id = "xr-3", PatientId = "P-102", Label = "Anterior Panorex (7, 8, 9)", Date = "2026-05-18", Type = "panoramic" },
                new() { Id = "xr-4", PatientId = "P-103", Label = "Full Mouth Series", Date = "2026-02-10", Type = "fms" },
                new() { Id = "xr-5", PatientId = "P-104", Label = "Upper Left Quadrant PA", Date = "2026-06-01", Type = "periapical" }
            });

            // Seed Visits
            context.VisitNotes.AddRange(new List<VisitNote>
            {
                new() { PatientId = "P-101", Date = "2026-03-12", Notes = "Routine checkup. Found active decay on tooth #3 distal-occlusal. Scheduled treatment plan." },
                new() { PatientId = "P-101", Date = "2026-01-20", Notes = "Permanent porcelain crown cementation on tooth #19. Bite checked and verified." },
                new() { PatientId = "P-102", Date = "2026-05-18", Notes = "Patient presented with chipped tooth #8 after minor fall. Recommend composite restoration or veneer." },
                new() { PatientId = "P-103", Date = "2026-02-10", Notes = "Hygienist cleaning. No active cavities detected. Plaque index low." },
                new() { PatientId = "P-104", Date = "2026-06-01", Notes = "Comprehensive evaluation. Noted active decay on #12, #20, and #21. Patient advised to monitor blood sugar prior to treatment appointments." }
            });

            context.SaveChanges();
        }

        if (!context.Appointments.Any())
        {
            context.Appointments.AddRange(new List<Appointment>
            {
                new()
                {
                    Id = "apt-1",
                    PatientId = "P-101",
                    PatientName = "Eleanor Vance",
                    Time = "09:00",
                    Duration = 60,
                    Room = "Operatory A",
                    Dentist = "Dr. Sarah Carter",
                    Type = "Filling (#3 MOD)",
                    Status = "confirmed",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-2",
                    PatientId = "P-102",
                    PatientName = "Marcus Sterling",
                    Time = "10:30",
                    Duration = 45,
                    Room = "Operatory A",
                    Dentist = "Dr. Sarah Carter",
                    Type = "Composite (#8)",
                    Status = "checked-in",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-3",
                    PatientId = "P-103",
                    PatientName = "Chloe Park",
                    Time = "09:00",
                    Duration = 60,
                    Room = "Hygiene Room",
                    Dentist = "Hygienist Amy Miller",
                    Type = "Prophylaxis & Fluoride",
                    Status = "completed",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-4",
                    PatientId = "P-104",
                    PatientName = "Samuel Henderson",
                    Time = "11:15",
                    Duration = 90,
                    Room = "Operatory B",
                    Dentist = "Dr. James Aris",
                    Type = "Consultation & X-Rays",
                    Status = "scheduled",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-5",
                    PatientId = "P-101",
                    PatientName = "Eleanor Vance",
                    Time = "13:00",
                    Duration = 45,
                    Room = "Operatory B",
                    Dentist = "Dr. James Aris",
                    Type = "Post-Op Follow-up",
                    Status = "scheduled",
                    Date = "2026-06-19"
                }
            });
            context.SaveChanges();
        }

        if (!context.StaffMembers.Any())
        {
            context.StaffMembers.AddRange(new List<StaffMember>
            {
                new() { Name = "Dr. Sarah Johnson", Id = "ID: D-101", Role = "General Dentist", RoleBg = "#dcfce7", RoleColor = "#15803d", Dept = "Preventive Care", Phone = "(555) 123-4567", Email = "sarah.j@auradental.com", Sched = "Mon - Fri", Time = "09:00 AM - 05:00 PM", Initials = "SJ" },
                new() { Name = "Dr. Michael Brown", Id = "ID: D-102", Role = "Orthodontist", RoleBg = "#e0f2fe", RoleColor = "#0369a1", Dept = "Orthodontics", Phone = "(555) 234-5678", Email = "michael.b@auradental.com", Sched = "Mon - Sat", Time = "10:00 AM - 06:00 PM", Initials = "MB" },
                new() { Name = "Dr. Emily Davis", Id = "ID: D-103", Role = "Endodontist", RoleBg = "#f3e8ff", RoleColor = "#7e22ce", Dept = "Endodontics", Phone = "(555) 345-6789", Email = "emily.d@auradental.com", Sched = "Mon - Fri", Time = "08:30 AM - 04:30 PM", Initials = "ED" },
                new() { Name = "Dr. James Wilson", Id = "ID: D-104", Role = "Oral Surgeon", RoleBg = "#ffedd5", RoleColor = "#c2410c", Dept = "Oral Surgery", Phone = "(555) 456-7890", Email = "james.w@auradental.com", Sched = "Tue - Sat", Time = "10:00 AM - 06:00 PM", Initials = "JW" },
                new() { Name = "Dr. Lisa Anderson", Id = "ID: D-105", Role = "Pediatric Dentist", RoleBg = "#fce7f3", RoleColor = "#be185d", Dept = "Pediatric Dentistry", Phone = "(555) 567-8901", Email = "lisa.a@auradental.com", Sched = "Mon - Fri", Time = "09:00 AM - 05:00 PM", Initials = "LA" },
                new() { Name = "Anna Smith", Id = "ID: S-201", Role = "Receptionist", RoleBg = "#fef3c7", RoleColor = "#b45309", Dept = "Front Office", Phone = "(555) 111-2222", Email = "anna.s@auradental.com", Sched = "Mon - Fri", Time = "08:30 AM - 05:30 PM", Initials = "AS" },
                new() { Name = "Mark Thompson", Id = "ID: S-202", Role = "Dental Assistant", RoleBg = "#e0e7ff", RoleColor = "#4338ca", Dept = "Clinical Support", Phone = "(555) 222-3333", Email = "mark.t@auradental.com", Sched = "Mon - Sat", Time = "09:00 AM - 06:00 PM", Initials = "MT" },
                new() { Name = "Priya Lee", Id = "ID: S-203", Role = "Hygienist", RoleBg = "#fef08a", RoleColor = "#a16207", Dept = "Preventive Care", Phone = "(555) 333-4444", Email = "priya.l@auradental.com", Sched = "Mon - Fri", Time = "09:00 AM - 05:00 PM", Initials = "PL" }
            });
            context.SaveChanges();
        }

        if (!context.Invoices.Any())
        {
            context.Invoices.AddRange(new List<Invoice>
            {
                new() { Id = "INV-1054", Patient = "Eleanor Vance", Treatment = "Root Canal Treatment", Date = "May 24, 2024", Due = "May 31, 2024", Total = "$2,500", Status = "Unpaid", StatusColor = "#fee2e2", StatusText = "#ef4444", Balance = "$2,500" },
                new() { Id = "INV-1053", Patient = "Marcus Sterling", Treatment = "Dental Implant", Date = "May 23, 2024", Due = "May 30, 2024", Total = "$4,850", Status = "Partial", StatusColor = "#ffedd5", StatusText = "#c2410c", Balance = "$2,000" },
                new() { Id = "INV-1052", Patient = "Chloe Park", Treatment = "Teeth Whitening", Date = "May 23, 2024", Due = "May 23, 2024", Total = "$1,500", Status = "Paid", StatusColor = "#dcfce7", StatusText = "#15803d", Balance = "$0" },
                new() { Id = "INV-1051", Patient = "Samuel Henderson", Treatment = "Braces Adjustment", Date = "May 22, 2024", Due = "May 29, 2024", Total = "$850", Status = "Paid", StatusColor = "#dcfce7", StatusText = "#15803d", Balance = "$0" },
                new() { Id = "INV-1050", Patient = "Lisa Anderson", Treatment = "Crown Placement", Date = "May 22, 2024", Due = "May 29, 2024", Total = "$2,100", Status = "Paid", StatusColor = "#dcfce7", StatusText = "#15803d", Balance = "$0" }
            });
            context.SaveChanges();
        }

        if (!context.TreatmentCategories.Any())
        {
            context.TreatmentCategories.AddRange(new List<TreatmentCategory>
            {
                new() { Id = 1, Name = "Preventive Care", Count = 8, Desc = "Regular check-ups, cleanings, and preventive treatments." },
                new() { Id = 2, Name = "Restorative", Count = 12, Desc = "Fillings, crowns, bridges, and restoration procedures." },
                new() { Id = 3, Name = "Cosmetic Dentistry", Count = 9, Desc = "Teeth whitening, veneers, bonding, and smile makeovers." },
                new() { Id = 4, Name = "Orthodontics", Count = 7, Desc = "Braces, aligners, retainers, and teeth alignment." },
                new() { Id = 5, Name = "Endodontics", Count = 6, Desc = "Root canal therapy and related treatments." },
                new() { Id = 6, Name = "Oral Surgery", Count = 4, Desc = "Extractions, implants, and surgical procedures." },
                new() { Id = 7, Name = "Periodontics", Count = 5, Desc = "Gum treatments and periodontal care." },
                new() { Id = 8, Name = "Prosthodontics", Count = 7, Desc = "Dentures, implants, and prosthesis solutions." },
                new() { Id = 9, Name = "Emergency Care", Count = 4, Desc = "Urgent dental care and emergency treatments." },
                new() { Id = 10, Name = "Radiology", Count = 4, Desc = "X-rays, imaging, and diagnostic procedures." },
                new() { Id = 11, Name = "Radiol/Othersogy", Count = 6, Desc = "Miscellaneous and specialized treatments." }
            });
            context.SaveChanges();
        }

        if (!context.FollowUps.Any())
        {
            context.FollowUps.AddRange(new List<FollowUp>
            {
                new() { Id = 1, Date = "May 22", Name = "Thomas Parker", Reason = "Braces Check", Doc = "Dr. Aisha Patel", Time = "10:00 AM" },
                new() { Id = 2, Date = "May 23", Name = "Ava Nguyen", Reason = "Crown Check", Doc = "Dr. Marcus Sterling", Time = "10:00 AM" },
                new() { Id = 3, Date = "May 24", Name = "Jack Brown", Reason = "Cleaning", Doc = "Dr. Aisha Patel", Time = "10:00 AM" }
            });
            context.SaveChanges();
        }

        if (!context.Transactions.Any())
        {
            context.Transactions.AddRange(new List<Transaction>
            {
                new() { Id = 1, Type = "Payment Received", Desc = "INV-1053", Amount = "+$1,500", Time = "10:30 AM", Color = "#10b981" },
                new() { Id = 2, Type = "Payment Received", Desc = "INV-1051", Amount = "+$850", Time = "09:15 AM", Color = "#10b981" },
                new() { Id = 3, Type = "Invoice Created", Desc = "INV-1054", Amount = "$2,500", Time = "Yesterday", Color = "#3b82f6" },
                new() { Id = 4, Type = "Refund Issued", Desc = "REF-1042", Amount = "-$500", Time = "May 22", Color = "#ef4444" }
            });
            context.SaveChanges();
        }
    }
}
