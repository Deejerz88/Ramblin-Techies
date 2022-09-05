createBlogEl = $('#create-blog');
const createBlogHandler = async (event) => {
  event.preventDefault();
  console.log('new post', event)
  const title = $('#blog-title').val().trim();
  const content = $('#blog-content').val().trim();
  const user_id = window.location.pathname.split('/')[2];

  if (title && content) {
    const response = await fetch('/api/blogposts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${user_id}`);
    } else {
      alert('Failed to create blog');
    }
  }
}


createBlogEl.on('click', createBlogHandler);