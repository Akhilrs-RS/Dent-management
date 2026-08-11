using System;

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
