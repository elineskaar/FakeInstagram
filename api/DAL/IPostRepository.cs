using WebEksamenSub1.Models;
namespace WebEksamenSub1.DAL;

public interface IPostRepository
{
    Task<IEnumerable<Post>?> GetAll();
    Task<Post?> GetPostById (int id);
    Task <bool> Create (Post post);
    Task <bool> Update (Post post);
    Task <bool> Delete (int id);
    Task <bool> AddCommentAsync (PostComment comment);
    Task <bool> UpdateComment (PostComment comment);
    Task <bool> DeleteComment (int postId, int commentId);
    Task <bool> AddLikeAsync (PostLike like);
}