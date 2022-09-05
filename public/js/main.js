const createBlogEl = $("#create-blog");
const blogEditEl = $(".blog-edit");
const blogDeleteEl = $(".blog-delete");


const createBlogHandler = async (event) => {
  event.preventDefault();
  console.log("new post", event);

  const title = $("#new-blog-title").val().trim();
  const content = $("#new-blog-content").val().trim();
  const user_id = window.location.pathname.split("/")[2];

  if (title && content) {
    const response = await fetch("/api/blogposts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${user_id}`);
    } else {
      $('.toast-body').text("Failed to create blog")
      $('.toast').toast('show');
    }
  }
};

const updateBlogHandler = async (event) => {
  event.preventDefault();
  const target = $(event.target);
  const blogId = target.attr("id").split("-")[2];
  console.log("blogId", blogId);
  const titleEl = $(`#blog-title-${blogId}`);
  const contentEl = $(`#blog-content-${blogId}`);
  console.log(titleEl);

  console.log("target val");
};

const editBlogHandler = async (event) => {
  event.preventDefault();
  const target = $(event.target);
  const blogId = target.attr("id").split("-")[2];
  const titleEl = $(`#blog-title-${blogId}`);
  const contentEl = $(`#blog-content-${blogId}`);
  const readMoreEl = $(`#read-more-${blogId}`);
  const updateBtnsEl = $(`#update-blog-btns-${blogId}`);
  const disabled = !titleEl.prop("disabled");

  let title = titleEl.val().trim();
  let content = contentEl.val().trim();

  titleEl
    .prop("disabled", disabled)
    .toggleClass("form-control-plaintext")
    .toggleClass("form-control");
  contentEl
    .prop("disabled", disabled)
    .toggleClass("form-control-plaintext")
    .toggleClass("form-control");
  readMoreEl.prop("hidden", !disabled);
  updateBtnsEl.prop("hidden", disabled);
  if (!disabled) {
    updateBtnsEl.on("click", async (event) => {
      if (event.target.textContent === "Cancel") {
        titleEl.val(title);
        contentEl.val(content);
        editBlogHandler(event);
        return;
      }
      title = titleEl.val().trim();
      content = contentEl.val().trim();
      if (title && content) {
        const response = await fetch(`/api/blogposts/${blogId}`, {
          method: "PUT",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          editBlogHandler(event);
        } else {
          $('.toast-body').text("Failed to update blog")
          $('.toast').toast('show');
        }
      }
    });
  }
};

const deleteBlogHandler = async (event) => {
  event.preventDefault();
  const target = $(event.target);
  const blogId = target.attr("id").split("-")[2];
  $(`#blog-${blogId}`).remove();
  const response = await fetch(`/api/blogposts/${blogId}`, {
    method: "DELETE",
  });
}

createBlogEl.on("click", createBlogHandler);
blogEditEl.on("click", editBlogHandler);
blogDeleteEl.on("click", deleteBlogHandler);
$(document).ready(function () {
  $(".toast").toast();
})
