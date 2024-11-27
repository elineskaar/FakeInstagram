using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebEksamenSub1.DTOs{
    public class PostDto{
        public int Id {get; set;}
        
        public string? ImageUrl {get; set;}

        [StringLength(200)]
        public string PostText {get; set;} = string.Empty;

        
        [NotMapped]
        public virtual IFormFile? ImageFile {get;set;}


        
    }
    
    
}