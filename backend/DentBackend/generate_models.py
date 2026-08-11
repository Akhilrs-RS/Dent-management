import os

models_dir = "/Users/akhilrs/Desktop/Galletrix/dent/Backend/DentBackend/Models"

patient_cs = """using System;
using System.Collections.Generic;

namespace DentBackend.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Contact { get; set; } = string.Empty;
        public string MedicalHistory { get; set; } = string.Empty;
        
        public List<DentalChartEntry> DentalChart { get; set; } = new();
        public List<Appointment> Appointments { get; set; } = new();
        public List<Invoice> Invoices { get; set; } = new();
    }
}
"""

dental_chart_cs = """using System;

namespace DentBackend.Models
{
    public class DentalChartEntry
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int ToothNumber { get; set; }
        public string Status { get; set; } = "healthy"; // e.g., healthy, decay, crown
        public string Notes { get; set; } = string.Empty;
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        public Patient? Patient { get; set; }
    }
}
"""

appointment_cs = """using System;

namespace DentBackend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; } = "Scheduled";
        public string Reason { get; set; } = string.Empty;

        public Patient? Patient { get; set; }
        public StaffMember? Doctor { get; set; }
    }
}
"""

staff_cs = """using System.Collections.Generic;

namespace DentBackend.Models
{
    public class StaffMember
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // Dentist, Hygienist, etc.
        public string Department { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public List<Appointment> Appointments { get; set; } = new();
    }
}
"""

invoice_cs = """using System;

namespace DentBackend.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string Treatment { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; } = DateTime.UtcNow;
        public DateTime DueDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Balance { get; set; }
        public string Status { get; set; } = "Pending";

        public Patient? Patient { get; set; }
    }
}
"""

db_context_cs = """using Microsoft.EntityFrameworkCore;

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
"""

files = {
    "Patient.cs": patient_cs,
    "DentalChartEntry.cs": dental_chart_cs,
    "Appointment.cs": appointment_cs,
    "StaffMember.cs": staff_cs,
    "Invoice.cs": invoice_cs,
    "AppDbContext.cs": db_context_cs
}

for filename, content in files.items():
    with open(os.path.join(models_dir, filename), "w") as f:
        f.write(content)

print("Models created successfully.")
