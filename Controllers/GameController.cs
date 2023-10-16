using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPAGameASPReact.Data;
using SPAGameASPReact.Models;
using System.Security.Claims;

namespace SPAGameASPReact.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GameController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("new")]
        public IActionResult StartNewGame()
        {
            var randomNumber = new Random().Next(1, 10);
            var userId = GetUserId();

            var game = new Game
            {
                TargetNumber = randomNumber,
                UserId = userId,
                Guesses = new List<Guess>(),
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Games.Add(game);
            _context.SaveChanges();
            // Increment GamesPlayed count for the user
            var user = _context.Users.SingleOrDefault(u => u.Id == userId);
            if (user != null)
            {
                user.GamesPlayed++;
                _context.SaveChanges();
            }

            return Ok(new { GameId = game.Id });
        }



        [HttpPost("guess/{gameId}")]
        public IActionResult SubmitGuess(Guid gameId, [FromBody] int guess)
        {
            var userId = GetUserId();
            var game = _context.Games.SingleOrDefault(g => g.Id == gameId && g.UserId == userId && !g.IsCompleted);

            if (game == null)
            {
                return NotFound("Game not found or already completed.");
            }

            var isCorrect = guess == game.TargetNumber;
            var message = isCorrect ? "Correct guess!" : guess < game.TargetNumber ? "Guess is too low." : "Guess is too high.";

            if (!isCorrect)
            {
                game.Guesses.Add(new Guess { Number = guess });
                _context.SaveChanges();
            }
            else
            {
                game.IsCompleted = true;
                _context.SaveChanges();

                // Increment GamesWon count for the user if the game is won
                var user = _context.Users.SingleOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    user.GamesWon++;
                    _context.SaveChanges();

                    // Calculate score and save it to the Scores table
                    int score = CalculateScore(game);
                    var scoreEntry = new Score
                    {
                        UserId = userId,
                        GameId = game.Id,
                        Points = score,
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Scores.Add(scoreEntry);
                    _context.SaveChanges();
                }
            }

            return Ok(new { Correct = isCorrect, IsCompleted = game.IsCompleted, Message = message });
        }




        [HttpGet("scores")]
        public IActionResult GetScores()
        {
            var userId = GetUserId();
            var userScores = _context.Games
                .Where(g => g.UserId == userId && g.IsCompleted)
                .OrderByDescending(g => g.CreatedAt)
                .Select(g => new { GameId = g.Id, Score = CalculateScore(g) })
                .ToList();

            return Ok(userScores);
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        private int CalculateScore(Game game)
        {
            int baseScore = 100;
            int deductionPerAttempt = 10;

            // Count all guess attempts for the specific game ID
            int totalAttempts = _context.Guesses.Count(g => g.GameId == game.Id);

            // Calculate score based on total attempts
            int score = baseScore - (totalAttempts * deductionPerAttempt);

            // Ensure the score is not negative
            return Math.Max(score, 0);
        }



    }
}
