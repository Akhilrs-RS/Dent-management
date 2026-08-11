using System;

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
