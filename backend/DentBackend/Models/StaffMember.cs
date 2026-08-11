using System.Collections.Generic;

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
