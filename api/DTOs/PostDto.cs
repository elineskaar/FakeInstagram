using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebEksamenSub1.DTOs{
    public class PostDto{
        public int Id {get; set;}
        
        public string? ImageUrl {get; set;}

        [StringLength(200)]
        public string PostText {get; set;} = string.Empty;

        public int LikesCount {get; set;}

        public List<CommentDto> Comments {get;set;} = new();
        
        [NotMapped]
        public virtual IFormFile? ImageFile {get;set;}
    }
    
    public class CommentDto
    {
        public int Id { get; set; }
        public string CommentText { get; set; } = string.Empty;
    }
    
}