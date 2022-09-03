commentBtn = $("#comment-btn");

commentBtn.click(function () {
  console.log("commentBtn", commentBtn);
  const userId = commentBtn.data("user");
  const blogId = commentBtn.data("blog");
  console.log(blogId);
  const comment = $("#comment").val();
  const commentData = {
    comment,
    user_id: userId,
  };
  fetch(`/blog/${blogId}`, {
    method: "PUT",
    body: JSON.stringify({ data: { commentData } }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  $(".comments").append('<p>comment here</p><hr class="blog-hr">');
});
