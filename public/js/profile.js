const nameEl = $("#profile-name"); //document.getElementById("profile-name");
const emailEl = $("#profile-email");
const githubEl = $("#profile-github");
const slackEl = $("#profile-slack");
const buttonEl = $("#profile-buttons");
const editIcon = $("#edit-icon");
const bioEl = $("#profile-bio");
const imageEl = $("#profile-pic");
const uploadBtns = $("#upload-btns");

let uploadEl = $("#image-upload");
let name, email, github, slack, bio, originalImg, newImg;

const enableEdit = () => {
  $(".profile-input").each(function (i) {
    const input = $(this);
    input.prop("disabled", false);
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");

    // input.removeAttribute("disabled");

    // input.classList.toggle("form-control-plaintext");
    // input.classList.toggle("form-control");
  });
  buttonEl.prop("hidden", false);
  editIcon.prop("hidden", true);

  // buttonEl.removeAttribute("hidden");
  // editIcon.setAttribute("hidden", true);
  // bioEl.style.resize = 'both'
};

const disableEdit = () => {
  $(".profile-input").each(function (i) {
    const input = $(this);
    input.prop("disabled");
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");
  });
  buttonEl.prop("hidden", true);
  editIcon.prop("hidden", false);
  // bioEl.style.resize = "none";
};

const profileEditHandler = async (event) => {
  event.preventDefault();
  console.log("event", event);
  name = nameEl.val().trim();
  email = emailEl.val().trim();
  github = githubEl.val().trim();
  slack = slackEl.val().trim();
  bio = bioEl.val().trim();
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, email, github, slack, bio }),
    headers: { "Content-Type": "application/json" },
  });

  disableEdit();
};

const enableEditHandler = async (event) => {
  event.preventDefault();
  console.log("event", event);
  name = nameEl.val().trim();
  email = emailEl.val().trim();
  github = githubEl.val().trim();
  slack = slackEl.val().trim();
  bio = bioEl.val().trim();

  enableEdit();
};

const cancelEditHandler = async (event) => {
  event.preventDefault();
  nameEl.val(name);
  emailEl.val(email);
  githubEl.val(github);
  slackEl.val(slack);
  bioEl.val(bio);

  disableEdit();
};

const previewProfileImage = () => {
  //ensure a file was selected
  const uploader = uploadEl.get()[0];
  if (uploader.files && uploader.files[0]) {
    originalImg = imageEl.attr("src");
    const imageFile = uploader.files[0];
    const type = imageFile.type.split("/")[1];
    let reader = new FileReader();
    reader.onload = function (e) {
      //set the image data as source
      imageEl.attr("src", e.target.result);
      newImg = { data: e.target.result, type };
      console.log("newImg", newImg);
    };
    reader.readAsDataURL(imageFile);
    uploadBtns.prop("hidden", false);
  }
};

const profilePicHandler = async (event) => {
  event.preventDefault();
  const action = event.target.textContent;
  if (action === "Cancel") {
    imageEl.attr("src", originalImg);
    uploadBtns.prop("hidden", true);
    uploadEl.replaceWith(uploadEl.val('').clone())
    uploadEl = $("#image-upload").on("change", () => previewProfileImage());
    return;
  }
  const id = window.location.pathname.split("/")[2];
  const response = await fetch(`/api/users/image/${id}`, {
    method: "POST",
    body: JSON.stringify({ newImg }),
    headers: { "Content-Type": "application/json" },
  });
};

uploadBtns.on("click", profilePicHandler);
imageEl.on("click", () => uploadEl.click());
uploadEl.on("change", () => previewProfileImage());

$("#profile-form").on("submit", profileEditHandler);
$("#edit-icon").on("click", enableEditHandler);
$("#cancel-profile").on("click", cancelEditHandler);
