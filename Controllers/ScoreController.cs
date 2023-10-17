using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPAGameASPReact.Data;

namespace SPAGameASPReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoreController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScoreController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetHighestPoints()
        {
            var highestScores = _context.Scores
                .Include(s => s.User) // Include the User class
                .GroupBy(s => s.UserId)
                .Select(group => new
                {
                    UserId = group.Key,
                    UserName = group.First().User != null ? group.First().User.UserName : "Unknown", // Get user name or fallback to "Unknown"
                    HighestPoints = group.Max(s => s.Points)
                })
                .ToList();

            return Ok(highestScores);
        }



    }
}
