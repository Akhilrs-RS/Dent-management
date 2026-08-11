using System;
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
