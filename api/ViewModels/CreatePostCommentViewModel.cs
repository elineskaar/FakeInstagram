using Microsoft.AspNetCore.Mvc.Rendering;
using WebEksamenSub1.Models;

namespace WebEksamenSub1.ViewModels;

public class CreatePostCommentViewModel
{
    public PostComment PostComment {get; set;} = default!;
    public int PostId {get; set;}

    public Post? Post {get; set;}
}