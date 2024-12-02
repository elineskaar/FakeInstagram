
using WebEksamenSub1.Models;

namespace WebEksamenSub1.ViewModels
{
    public class PostsViewModel
    {
        public IEnumerable<Post> Posts { get; set; } 
        public string? CurrentViewName { get; set; }

        public PostsViewModel(IEnumerable<Post> posts, string? currentViewName)
        {
            Posts = posts;
            CurrentViewName = currentViewName;
        }

             public PostsViewModel() 
        {
            Posts = new List<Post>();
        }
    }
}