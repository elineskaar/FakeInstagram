namespace WebEksamenSub1.Models;

public class PostComment{
            public int Id {get; set;}
            
            public int PostId{get;set;}
            public virtual Post Post { get; set; } = default!;

            public string CommentText {get; set;} = String.Empty;
    }