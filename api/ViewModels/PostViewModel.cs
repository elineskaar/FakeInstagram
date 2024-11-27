//using WebEksamen.Models;

//namespace WebEksamen.ViewModels
//{
    //public class PostsViewModel
    //{
       // public IEnumerable<Post> Posts;
       // public string? CurrentViewName;

       // public PostsViewModel(IEnumerable<Post> posts, string? currentViewName)
       // {
       //     Posts = posts;
       //     CurrentViewName = currentViewName;
       // }
  //  }
//}

using WebEksamenSub1.Models;

namespace WebEksamenSub1.ViewModels
{
    public class PostsViewModel
    {
        public IEnumerable<Post> Posts { get; set; } // Use property instead of field
        public string? CurrentViewName { get; set; } // Use property instead of field

        public PostsViewModel(IEnumerable<Post> posts, string? currentViewName)
        {
            Posts = posts;
            CurrentViewName = currentViewName;
        }

        // Parameterless constructor for model binding
        public PostsViewModel() 
        {
            Posts = new List<Post>();
        }
    }
}