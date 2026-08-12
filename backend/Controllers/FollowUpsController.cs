using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/followups")]
public class FollowUpsController : ControllerBase
{
    private readonly DentalDbContext _context;

    public FollowUpsController(DentalDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FollowUp>>> GetFollowUps()
    {
        return await _context.FollowUps.ToListAsync();
    }
}
