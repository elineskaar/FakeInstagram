using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebEksamenSub1.Models{
    public class Post{
        public int Id {get; set;}
        
        public string? ImageUrl {get; set;}

        [StringLength(200)]
        public string PostText {get; set;} = string.Empty;
        

        [StringLength(300)]
        public virtual ICollection<PostComment> Comments {get; set;} = new List<PostComment>();
        public virtual ICollection<PostLike> Likes {get; set; }= new List<PostLike>();

        
        [NotMapped]
        public virtual IFormFile? ImageFile {get;set;}


        
    }
    
    
}