using Microsoft.EntityFrameworkCore;
using WebEksamenSub1.DAL;
using WebEksamenSub1.Models;


namespace WebEksamenSub1.DAL;

public static class DBInit
{
    public static void Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        PostDbContext context = serviceScope.ServiceProvider.GetRequiredService<PostDbContext>();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        if(!context.Posts.Any())
        {
           var posts = new List<Post>
        {
            new Post { Id = 1, ImageUrl = "/images/fly.jpg", PostText = "Finally on my way home!" },
            new Post { Id = 2, ImageUrl = "/images/panda.jpg", PostText = "I want her mindset" },
            new Post { Id = 3, ImageUrl = "/images/fugl.jpg", PostText = "Give me your wings please. I want to fly:(" },
            new Post { Id = 4, ImageUrl = "/images/ku.jpg", PostText = "Met this cutie last summer <3" },

        };
        var likes = new List<PostLike>
        {
            new PostLike { Id = 1, PostId = 1 },

            new PostLike { Id = 2, PostId = 2 },
            new PostLike { Id = 3, PostId = 2 },
            new PostLike { Id = 4, PostId = 2 },

            new PostLike { Id = 5, PostId = 3 },
            new PostLike { Id = 6, PostId = 3 },

            new PostLike { Id = 7, PostId = 4 },
            new PostLike { Id = 8, PostId = 4 },
            new PostLike { Id = 9, PostId = 4 },
            new PostLike { Id = 10, PostId = 4 },
            new PostLike { Id = 11, PostId = 4 }
        };

        var comments = new List<PostComment>
        {
            new PostComment {Id = 1, PostId = 1, CommentText = "Thank god you are coming home!!"},

            new PostComment {Id = 2, PostId = 2, CommentText = "I want to meet her as well!"},
            new PostComment {Id = 3, PostId = 2, CommentText = "OMG"},

            new PostComment {Id = 4, PostId = 3, CommentText = "What a strange thing to say."},

            new PostComment {Id = 5, PostId = 4, CommentText = "They dont make great pets..."},
            new PostComment {Id = 6, PostId = 4, CommentText = "I want to squish her/him so bad!"}
        };
            context.Posts.AddRange(posts);
            context.PostLikes.AddRange(likes);
            context.PostComments.AddRange(comments);
            context.SaveChanges();

            };
            
        }
    }

