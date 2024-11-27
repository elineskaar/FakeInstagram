namespace WebEksamenSub1.Models;

public class PostLike{
    public int Id {get;set;}
    public int PostId{get;set;}
    public virtual Post Post {get;set;} = default!;
}