using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebEksamenSub1.Models;
using WebEksamenSub1.ViewModels;
using WebEksamenSub1.DAL;
using WebEksamenSub1.DTOs;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Http.HttpResults;


namespace WebEksamenSub1.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PostAPIController : Controller{
   private readonly IPostRepository _postRepository;
    private readonly ILogger<PostController> _logger; //lagt til logging 

    public PostAPIController(IPostRepository postRepository, ILogger<PostController> logger){
        _postRepository = postRepository;
        _logger = logger; //lagt til logging
    }

    [HttpGet ("postList")]
    public async Task<IActionResult> PostList()
    {   
        _logger.LogInformation("Fetching posts...");
        var posts = await _postRepository.GetAll();
        if(posts == null){
            _logger.LogError("[PostAPIController] Post list not found while executing _postRepository.GetAll()");
            return NotFound("Post list not found");
        }
        var postDtos = posts.Select(post => new PostDto
        {
            Id = post.Id,
            PostText = post.PostText,
            ImageUrl = post.ImageUrl,
            

        });
        return Ok(postDtos);
    }

    [HttpPost("create")]
public async Task<IActionResult> Create([FromForm] PostDto postDto)
{
    if (postDto == null || postDto.ImageFile == null)
    {
        return BadRequest("Post cannot be null or image is missing");
    }

    // Lagre bildet på serveren
    var imagePath = Path.Combine("wwwroot", "images", postDto.ImageFile.FileName);
    using (var stream = new FileStream(imagePath, FileMode.Create))
    {
        await postDto.ImageFile.CopyToAsync(stream);
    }

    // Lagre URL-en til bildet i databasen
    var newPost = new Post
    {
        PostText = postDto.PostText,
        ImageUrl = $"/images/{postDto.ImageFile.FileName}" // URL for bildet
    };

    bool returnOk = await _postRepository.Create(newPost);
    if (returnOk)
        return CreatedAtAction(nameof(PostList), new { id = newPost.Id }, newPost);

    _logger.LogWarning("[PostAPIController] Post creation failed {@post}", newPost);
    return StatusCode(500, "Internal server error");
} 

[HttpGet("{id}")]
public async Task<IActionResult> GetPost(int id)
{
    var post = await _postRepository.GetPostById(id);
    if (post == null)
    {
        _logger.LogError("PostAPIController] Item not found for the PostId {PostId:0000}", id);
        return NotFound("Post not found for the PostId");
    }
    return Ok(post);
}

[HttpPut("update/{id}")]
public async Task<IActionResult> Update(int id, [FromForm] PostDto postDto)
{
    if (postDto == null)
    {
        return BadRequest("Post data cannot be null");
    }

    var existingPost = await _postRepository.GetPostById(id);
    if (existingPost == null)
    {
        return NotFound("Post not found");
    }

    // Update text content
    existingPost.PostText = postDto.PostText;

    // Handle image update if a new file is provided
    if (postDto.ImageFile != null)
    {
        // Assuming UploadImage is a method to handle file saving and returning the file URL
        string newImageUrl = await UploadImage(postDto.ImageFile);
        existingPost.ImageUrl = newImageUrl;
    }

    // Update post in the database
    bool updateSuccessful = await _postRepository.Update(existingPost);
    if (updateSuccessful)
    {
        return Ok(existingPost);
    }

    _logger.LogWarning("[PostAPIController] Post update failed {@post}", existingPost);
    return StatusCode(500, "Internal server error");
}

// Method to handle image file upload (you can adjust this as needed)
private async Task<string> UploadImage(IFormFile imageFile)
{
    // Logic for saving the image to a server or cloud storage
    string fileName = Path.GetFileName(imageFile.FileName);
    string filePath = Path.Combine("wwwroot/images", fileName);

    using (var fileStream = new FileStream(filePath, FileMode.Create))
    {
        await imageFile.CopyToAsync(fileStream);
    }

    // Return the URL or relative path to the image
    return "/images/" + fileName;
}

 [HttpDelete("delete/{id}")]
public async Task<IActionResult> DeleteConfirmed(int id)
{
    var post = await _postRepository.GetPostById(id); // Ensure this is available
    if (post == null)
    {
        _logger.LogError("[PostAPIController] Post not found for the PostId {PostId:0000}", id);
        return NotFound("Post not found");
    }

    bool returnOk = await _postRepository.Delete(id);
    if (!returnOk)
    {
        _logger.LogError("[PostAPIController] Post deletion failed for the PostId {PostId:0000}", id);
        return BadRequest("Post deletion failed");
    }

    return NoContent(); // 204 No Content - no need to return data after deletion
}
   

   // --------------- LIke
   [HttpPost("like/{postId}")]
public async Task<IActionResult> LikePost(int postId)
{
    var post = await _postRepository.GetPostById(postId);
    if (post == null)
    {
        return NotFound("Post not found");
    }

    // Create a new like for the post
    var like = new PostLike
    {
        PostId = postId,
        // You could include user information or other properties for likes
    };

    bool likeCreated = await _postRepository.AddLikeAsync(like);
    if (!likeCreated)
    {
        return StatusCode(500, "Failed to add like");
    }

    return Ok("Like added successfully");
}


// -----------Comment

[HttpPost("comment/{postId}")]
public async Task<IActionResult> CommentOnPost(int postId, [FromBody] PostComment comment)
{
    var post = await _postRepository.GetPostById(postId);
    if (post == null)
    {
        return NotFound("Post not found");
    }

    // Set the postId for the comment
    comment.PostId = postId;

    bool commentAdded = await _postRepository.AddCommentAsync(comment);
    if (!commentAdded)
    {
        return StatusCode(500, "Failed to add comment");
    }

    return Ok("Comment added successfully");
}
[HttpDelete("comment/{postId}/{commentId}")]
public async Task<IActionResult> DeleteComment(int postId, int commentId)
{
    // Ensure the post exists
    var post = await _postRepository.GetPostById(postId);
    if (post == null)
    {
        return NotFound("Post not found");
    }

    // Attempt to delete the comment
    bool deleteSuccess = await _postRepository.DeleteComment(postId, commentId);
    if (!deleteSuccess)
    {
        return StatusCode(500, "Failed to delete comment");
    }

    return NoContent(); // 204 No Content - no need to return data after deletion
}


}

public class PostController : Controller
{
    private readonly IPostRepository _postRepository;
    private readonly ILogger<PostController> _logger; //lagt til logging
    public PostController(IPostRepository postRepository, ILogger<PostController> logger){
        _postRepository = postRepository;
        _logger = logger; //lagt til logging
    }

    public async Task<IActionResult> ShowPost(int id)
    {
        var post = await _postRepository.GetPostById(id);
        if (post == null){
            _logger.LogError("[PostController] Post not found for the PostId {PostId:0000}", id);
            return NotFound();
        }
        var model = new CreatePostCommentViewModel
        {
            Post = post,
            PostId = post.Id,
            PostComment = new PostComment()
        };
        return View(model);
    }
    public async Task<IActionResult> ShowAll()
    {   
        var posts = await _postRepository.GetAll();
        if(posts == null){
            _logger.LogError("[PostController] Post list not found while executing _postRepository.GetAll()");
            return NotFound("Post list not found");
        }
        var postsViewModel = new PostsViewModel(posts, "ShowAll");
        return View(postsViewModel);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreatePostComment(CreatePostCommentViewModel model){
        var newComment = new PostComment 
        {
            CommentText = model.PostComment.CommentText,
            PostId = model.PostId
        };
        bool returOk = await _postRepository.AddCommentAsync(newComment);
        var postWithComments = await _postRepository.GetPostById(model.PostId);
        if(returOk){
            return RedirectToAction("ShowPost", new {id = model.PostId});
        }
        _logger.LogWarning("[PostController] Comment creation failed {@comment}", model);
        return View(model);
    }
        
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DeleteComment(int postId, int commentId)
    {
        

        bool commentDeleted = await _postRepository.DeleteComment(postId, commentId);
        if (!commentDeleted)
        {
            _logger.LogError("[PostController] Comment deletion failed for the CommentId {CommentId:0000}", commentId);
            return BadRequest("Comment deletion failed");
        }

        // Etter sletting, omdiriger til innleggets detaljer
        return RedirectToAction("ShowPost", new { id = postId });
    }
    
    [HttpPost]
    [Authorize]
     public async Task<IActionResult> LikePost (int postId, string returnView){
        var newLike = new PostLike 
        {
            PostId = postId
        };
        bool returnOk = await _postRepository.AddLikeAsync(newLike);
        if(returnOk){
            var postWithLikes = await _postRepository.GetPostById(postId);
       
        if (returnView == "ShowPost"){
            if(postWithLikes!= null){
                var viewModel = new CreatePostCommentViewModel
                {
                    PostId = postWithLikes.Id,
                    Post = postWithLikes,  // Legger til post med oppdaterte likes og kommentarer
                    PostComment = new PostComment() // Hvis du legger til kommentarer
                };
                return View("ShowPost", viewModel);
            }
            else{
                return View("ShowPost");
            }
        }
        else
        {
        // Hvis brukeren var på ShowAll
            var posts = await _postRepository.GetAll();
            var viewModel = new PostsViewModel
            {
                Posts = posts.ToList()
            };
            return View("ShowAll", viewModel);
        }
        }
        _logger.LogWarning("[PostController] Like creation failed for PostId {PostId:0000}", postId);
        return View(returnView);
        
    }

    [HttpGet]
    [Authorize]
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(Post post){
        //Så lenge modelldataene er gyldig:
        if(ModelState.IsValid){
            if(post.ImageFile != null){
                //sets up path for Image storage
                var fileName = Path.GetFileName(post.ImageFile.FileName);
                var filePath = Path.Combine("wwwroot/images",fileName);

                //Save image on server with filepath
                using(var stream = new FileStream(filePath, FileMode.Create)){
                    await post.ImageFile.CopyToAsync(stream);
                }
                //Setting image file in Post Model
                post.ImageUrl = "/images/" + fileName;
            }
            //saving the post in database
            
            bool returnOk = await _postRepository.Create(post);
            if(returnOk){
                return RedirectToAction("ShowAll");
            }
        }
        _logger.LogWarning("[PostController] Post creation failed {@post}",post);
        return View(post);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Update (int id)
    {
        var post = await _postRepository.GetPostById(id);
        if (post == null)
        {
            _logger.LogError("[PostController] Post not found when updating the PostId {PostId:0000}", id);
            return BadRequest("Post not found for the PostId");
        }
        return View(post);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Update(Post post)
    {
        if(ModelState.IsValid){
            
            if(post.ImageFile != null){
                //sets up path for Image storage
                var fileName = Path.GetFileName(post.ImageFile.FileName);
                var filePath = Path.Combine("wwwroot/images",fileName);

                //Save image on server with filepath
                using(var stream = new FileStream(filePath, FileMode.Create)){
                    await post.ImageFile.CopyToAsync(stream);
                }
                //Setting image file in Post Model
                post.ImageUrl = "/images/" + fileName;
            }
            else{
                var currentPost = await _postRepository.GetPostById(post.Id);
                post.ImageUrl = currentPost.ImageUrl;
            }
            //saving the post in database
            
            bool returnOk = await _postRepository.Update(post);
            if(returnOk){
                return RedirectToAction("ShowAll");
            }
            
        }
        _logger.LogWarning("[PostController] Post update failed {@post}",post);
        return View(post);
    }


    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Delete(int id){
        var post = await _postRepository.GetPostById(id);
        if(post == null){
            _logger.LogError("[PostController] Post not found for the postID{PostID: 0000}",id);
            return BadRequest("Post not found for the postID");
        }
        return View(post);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DeleteConfirmed(int id){
        bool returnOk = await _postRepository.Delete(id);
        if(!returnOk){
            _logger.LogError("[PostController] Post deletion failed for {PostID: 0000}",id);
            return BadRequest("Post deletion failed");
        }
        return RedirectToAction(nameof(ShowAll));
    }

    
   

    

    
}