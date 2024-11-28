using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebEksamenSub1.Models{
    public class Post{
        public int Id {get; set;}
        //public int? ProfileId {get; set;}
        public string? ImageUrl {get; set;}
        
        
        
        [StringLength(200, ErrorMessage = "Caption cannot exceed 200 characters")] //fikse validation
        public string PostText {get; set;} = string.Empty;
        
        //public virtual Profile Profile {get; set;} = default!;

        public virtual ICollection<PostComment> Comments {get; set;} = new List<PostComment>();
        public virtual ICollection<PostLike> Likes {get; set; }= new List<PostLike>();

        
        [NotMapped]
        public virtual IFormFile? ImageFile {get;set;}

        //validation
        public string? ValidateImageFile()
        {
            if (ImageFile == null){
                return null;
            }

            var allowedFileTypes = new[] {"image/jpeg", "image/jpg", "image/png"};
            if(!allowedFileTypes.Contains(ImageFile.ContentType.ToLower()))
            {
            //if(ImageFile.ContentType != "image/jpeg" && ImageFile.ContentType !="image/jpg"){
                return "Only JPG and PNG files are allowed."
;
            }
            return null;
        }


        
    }
    
    
}