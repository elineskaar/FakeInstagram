using System.Drawing;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using WebEksamenSub1.DAL;
using WebEksamenSub1.Models;

namespace WebEksamenSub1.DAL;
public class PostRepository : IPostRepository
{
    private readonly PostDbContext _db;
    private readonly ILogger<PostRepository> _logger;
    public PostRepository(PostDbContext db, ILogger<PostRepository> logger){
        _db = db;
        _logger = logger;
    }
    public async Task<IEnumerable<Post>?> GetAll()
    {
        try{
            return await _db.Posts
            .OrderByDescending(p => p.Id)
            .Include(p => p.Likes)
            .ToListAsync();
        }
        catch (Exception e){
            _logger.LogError("[PostRepository] posts ToListAsync failed when GetAll(), error message: {e}",
            e.Message);
            return null;
        }
        
    }
    public async Task <bool> AddCommentAsync(PostComment comment)
    {
        try{
            _db.PostComments.Add(comment);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e){
            _logger.LogError("[PostRepository] comment creation failed for comment {@comment}, error message: {e}",
            comment, e.Message);
            return false;
        }
    }

    public async Task <bool> UpdateComment(PostComment comment)
    {
    try{
        // Check if the post is already tracked in the context
    var existingComment = await _db.PostComments.FindAsync(comment.Id);
    
    if (existingComment != null)
    {
        // Detach the existing tracked entity
        _db.Entry(existingComment).State = EntityState.Detached;
    }

    // Attach the new post entity (post)
    _db.PostComments.Update(comment);
    await _db.SaveChangesAsync();
    return true;
    }
    catch (Exception e){
         _logger.LogError("[PostRepository] comment FindAsync(id) failed when updating the CommentId {PostId:0000}, error message: {e}",
            comment, e.Message);
            return false;
    }
    } 


    public async Task <bool> AddLikeAsync(PostLike like)
    {
        try{
            _db.PostLikes.Add(like);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e){
            _logger.LogError("[PostRepository] like creation failed for like {@like}, error message: {e}",
            like, e.Message);
            return false;
        }
        
    }


    public async Task<Post?> GetPostById(int id)
    {
        try{
             return await _db.Posts
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .FirstOrDefaultAsync(p => p.Id == id);
        }
        catch (Exception e)
        {
          _logger.LogError("[PostRepository] post FirstOrDefaultAsync(id) failed when GetPostById for PostId {PostId:0000}, error message: {e}",
            id, e.Message);
            return null;  
        }
       
    }

    public async Task <bool> Create (Post post)
    {
        try{
            _db.Posts.Add(post);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[PostRepository] post creation failed for post {@post}, error message: {e}",
            post, e.Message);
            return false; 
        }
        
    }

    public async Task <bool> Update(Post post)
    {
    try{
        // Check if the post is already tracked in the context
    var existingPost = await _db.Posts.FindAsync(post.Id);
    
    if (existingPost != null)
    {
        // Detach the existing tracked entity
        _db.Entry(existingPost).State = EntityState.Detached;
    }

    // Attach the new post entity (post)
    _db.Posts.Update(post);
    await _db.SaveChangesAsync();
    return true;
    }
    catch (Exception e){
         _logger.LogError("[PostRepository] post FindAsync(id) failed when updating the PostId {PostId:0000}, error message: {e}",
            post, e.Message);
            return false;
    }    
    
}

    public async Task<bool> Delete (int id)
    {
        try{
            var post = await _db.Posts.FindAsync(id);
            if (post == null)
            {
                _logger.LogError("[PostRepository] post not found for the PostId {PostId:0000}",
                id);
                return false;
            }

        _db.Posts.Remove(post);
        await _db.SaveChangesAsync();
        return true;
        }
        catch (Exception e){
            _logger.LogError("[PostRepository] post deletion failed for the PostId {PostId:0000}, error message: {e}",
            id, e.Message);
            return false;
        }
        
    }

    public async Task<bool> DeleteComment(int postId, int commentId)
    {
        try{
            // Finn kommentaren direkte uten å laste hele posten
            var comment = await _db.PostComments
                           .Where(c => c.PostId == postId && c.Id == commentId)
                           .FirstOrDefaultAsync();

            if (comment == null)
            {
            _logger.LogError("[PostRepository] comment not found for the PostId {PostId:0000} and CommentId {CommentId:0000}", postId,
            commentId);
            return false; // Kommentar ble ikke funnet
            }

            // Fjern kommentaren fra databasen
            _db.PostComments.Remove(comment);

            // Lagre endringene i databasen
            await _db.SaveChangesAsync();

            return true; // Kommentar ble slettet
        }
        catch (Exception e){
            _logger.LogError("[PostRepository] comment deletion failed for the PostId {PostId:0000}, error message: {e}",
            postId, e.Message);
            return false;
        }
    }
}