using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/treatments/categories")]
public class TreatmentsController : ControllerBase
{
    private readonly DentalDbContext _context;

    public TreatmentsController(DentalDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TreatmentCategory>>> GetCategories()
    {
        return await _context.TreatmentCategories.ToListAsync();
    }
}
