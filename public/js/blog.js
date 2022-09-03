commentBtn = $("#comment-btn");

commentBtn.click(function () {
  console.log("commentBtn", commentBtn);
  const userId = commentBtn.data("user");
  const blogId = commentBtn.data("blog");
  
  console.log(blogId);
  const content = $("#comment").val();
  const commentData = {
    content,
    user_id: userId,
  };
  console.log('commentData', commentData);
  fetch(`/blog/${blogId}`, {
    method: "PUT",
    body: JSON.stringify({ data: { commentData } }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  $(".comments").append(
    `<img class='comment-img img-fluid' src="/images/uploads/profile-${userId}.jpg" <p>${content}</p><hr class="blog-hr">`
  );
});

//<img src="/images/uploads/profile-${userId}.jpg" 