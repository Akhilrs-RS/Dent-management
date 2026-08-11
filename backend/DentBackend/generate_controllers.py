import os

controllers_dir = "/Users/akhilrs/Desktop/Galletrix/dent/Backend/DentBackend/Controllers"

patients_controller = """using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DentBackend.Models;

namespace DentBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _context.Patients.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _context.Patients
                .Include(p => p.DentalChart)
                .Include(p => p.Appointments)
                .Include(p => p.Invoices)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (patient == null) return NotFound();

            return patient;
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, patient);
        }
    }
}
"""

with open(os.path.join(controllers_dir, "PatientsController.cs"), 'w') as f:
    f.write(patients_controller)

print("Controllers created.")
