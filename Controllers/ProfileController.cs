using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPAGameASPReact.Data;
using SPAGameASPReact.Models;
using System.Security.Claims;

namespace SPAGameASPReact.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Get the current user's ID
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            var userName = user.UserName;
            var gamesPlayed = await _context.Games.CountAsync(g => g.UserId == userId);
            var gamesWon = await _context.Games.CountAsync(g => g.UserId == userId && g.IsCompleted);
            var guessingAttempts = await _context.Guesses.CountAsync(g => g.Game.UserId == userId);

            var userProfile = new
            {
                UserName = userName,
                UserId = userId,
                GamesPlayed = gamesPlayed,
                GamesWon = gamesWon,
                GuessingAttempts = guessingAttempts
            };

            return Ok(userProfile);
        }
    }
}
