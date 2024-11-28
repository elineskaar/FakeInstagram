namespace WebEksamenSub1.Models;

public class PostComment{
            public int Id {get; set;}
            //public int ProfileId {get; set;}
            public int PostId{get;set;}
            public virtual Post Post { get; set; } = default!;

            //[StringLength (20, ErrorMessage = "Comment can't contain more than 20 symbols")]
            public string CommentText {get; set;} = String.Empty;
    }