using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SPAGameASPReact.Models;

namespace SPAGameASPReact.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }
        public DbSet<Game> Games { get; set; }
        public DbSet<Guess> Guesses { get; set; }
        public DbSet<Score> Scores { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<ApplicationUser>()
                .HasMany(u => u.Games)
                .WithOne(g => g.User)
                .HasForeignKey(g => g.UserId);

            builder.Entity<Game>()
                .HasMany(g => g.Guesses)
                .WithOne(g => g.Game)
                .HasForeignKey(g => g.GameId);

            builder.Entity<ApplicationUser>()
                .HasMany(u => u.Scores)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId);

            builder.Entity<Game>()
                .HasMany(g => g.Scores)
                .WithOne(s => s.Game)
                .HasForeignKey(s => s.GameId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}