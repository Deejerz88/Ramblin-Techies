commentBtn = $("#comment-btn");

commentBtn.click(function () {
  const user = commentBtn.data("user");
  const blogId = commentBtn.data("blog");
  const userId = user.id;
  const now = new Date().toLocaleString().replace(",", "<br/>");


  const content = $("#comment").val();
  const commentData = {
    content,
    user_id: userId,
    blogpost_id: blogId,
  };
  fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({ commentData }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  $(".comments").append(
    `<div class="container-fluid">
          <div class="row">
          <div class="col-1 comment-user p-0">
            <img
              class="comment-img mx-auto"
              src="/images/uploads/profile-${user.id}.jpg"
            />
            <p class="mb-0 comment-author text-center">
              ${user.name}
            </p>
            <p class="text-center"><small class='text-muted'>${now}</small></p>
          </div>
          <div class="col-11">
            <p>
              ${content}
            </p>
            </div>
          </div>
        </div>
        <hr class="blog-hr" />`
  );
  $("#comment").val("");
});

