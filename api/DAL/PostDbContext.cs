using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebEksamenSub1.Models;

namespace WebEksamenSub1.DAL;

public class PostDbContext :IdentityDbContext
{
    public PostDbContext(DbContextOptions<PostDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Post> Posts { get; set; } = default!; //la til default her pga feil i DbContext
    public DbSet<PostComment> PostComments{get; set;} = default!;
    public DbSet<PostLike> PostLikes{get; set;} = default!; // her også
}