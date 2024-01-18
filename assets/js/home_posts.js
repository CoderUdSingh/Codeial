{
  ///////////// Method to send the post data to the backend and receive the created post's data from the DB.
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (event) {
      event.preventDefault();

      $.ajax({
        type: "POST",
        url: "/posts/create",
        //This is the data we are sending through the form
        data: newPostForm.serialize(),
        success: function (
          data //data received from the backend
        ) {
          let newPost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  // DOM method to create HTML into jquery text html object
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p>${post.user.name} : ${post.content}</p>
  
    <small><a class="delete-post-button" href="/posts/destroy/${post._id}">x</a></small>
  
    <li>
      <form action="/comments/create" method="post">
        <input
          type="text"
          name="content"
          placeholder="add comments here"
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
  
        <input type="submit" value="-->" />
      </form>
  
      <div class="post-comments-list">
        <ul id="post-comments-${post._id}>">
          
        </ul>
      </div>
    </li>
  </li>`);
  };

  ///////////////////////// Method to delete a post ////////////////////////
  let deletePost = function (deleteLink) {
    $("deleteLink").click(function (event) {
      event.preventDefault();
      $.ajax({
        type: "GET",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.post_id}`).remove();
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  };

  createPost();
}
