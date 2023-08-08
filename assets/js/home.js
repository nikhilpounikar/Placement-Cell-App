{
  // ajax method to create post
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        method: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
        //   console.log("Calling via Ajax");
        //   console.log(data);

          let newPost = getPostDom(data.data.post);
          $('#feed-post-container>ul').prepend(newPost);
          console.log($('.post-delete-button',newPost));
          deletePost($('.post-delete-button',newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();

  let getPostDom = function (post) {
    return $(`<li id="post-${post._id}"> 
        <span>
        <a class="post-delete-button" href="/posts/delete/${post._id}">Delete</a>
        </span>
        <span>${post.content}</span>
        <br>
        <small>
        ${ post.user.name }
        </small>        
       
      
        
        <br>
        <small>
            
            <!-- <span><%#= post._id %> with _id</span>
            <span><%#= post.id %> without _id</span> -->
    
        </small>
        <br>
        <small>
                            
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
            </a>
                            
        </small>
    
        
        <form action="/comments/create" method="post">
                <!-- <textarea name="content" cols="30" rows="3"></textarea> -->
                <input type="text" name="content" placeholder="Type Here...." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" name="Add comment" id="">
        </form>
        
    
        <div class="post-comment-list">
            <ul id="post-comment-${post._id}">
                
            </ul>
    
        </div>
    </li>`);
  };

  let deletePost = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                method: "get",
                url: deleteLink.prop('href'),
                //data: newPostForm.serialize(),
                success: function (data) {
                  console.log("Post Delete Via Ajax");
                  console.log(data);
        
                  //let newPost = getPostDom(data.data.post);
                  $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                  console.log(error.responseText);
                },
            });
        })
  }


}
