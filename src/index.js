const baseURL = 'https://BKiptoo.github.io/Phase-1-Code-Challenge-Simple-Blog-Post-Manager/db.json'; // Path to db.json in your GitHub Pages repo

document.addEventListener('DOMContentLoaded', () => {
  // Initialize localStorage with db.json data if empty
  if (!localStorage.getItem('posts')) {
    fetch(baseURL)
      .then(res => res.json())
      .then(data => {
        // Assuming db.json has a "posts" array
        localStorage.setItem('posts', JSON.stringify(data.posts || []));
        displayPosts();
        setupNewPostForm();
      })
      .catch(() => {
        // Fallback to empty array if db.json fails to load
        localStorage.setItem('posts', JSON.stringify([]));
        displayPosts();
        setupNewPostForm();
      });
  } else {
    displayPosts();
    setupNewPostForm();
  }
});

function displayPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';
  document.getElementById('post-count').textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`;

  posts.forEach(post => {
    const item = document.createElement('div');
    item.className = 'post-item';
    item.textContent = post.title;
    item.dataset.id = post.id;
    item.addEventListener('click', () => loadPostDetail(post.id));
    postList.appendChild(item);
  });

  if (posts.length > 0) {
    loadPostDetail(posts[0].id);
  } else {
    document.getElementById('post-detail').innerHTML = `<p class="text-gray-500 italic">No posts yet.</p>`;
  }
}

function loadPostDetail(id) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const post = posts.find(p => p.id === id);
  if (!post) {
    document.getElementById('post-detail').innerHTML = `<p class="text-red-500 italic">Post not found.</p>`;
    return;
  }

  const detail = document.getElementById('post-detail');
  detail.innerHTML = `
    <h2 class="post-title">${post.title}</h2>
    <p class="post-author">By ${post.author} – ${new Date(post.date || Date.now()).toISOString().split('T')[0]}</p>
    <img src="${post.image}" alt="${post.title}" class="post-image" />
    <p class="post-content">${post.content}</p>
    <div class="action-buttons">
      <button type="button" id="edit-btn" class="edit-btn">Edit</button>
      <button type="button" id="delete-btn" class="delete-btn">Delete</button>
    </div>
  `;

  document.getElementById('edit-btn').onclick = () => showEditForm(post);
  document.getElementById('delete-btn').onclick = () => deletePost(post.id);
}

function setupNewPostForm() {
  const form = document.getElementById('new-post-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
      id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1, // Generate new ID
      title: form.title.value, // Fixed: Use .value instead of .valueOf
      content: form.content.value,
      image: form.image.value,
      author: form.author.value,
      date: new Date().toISOString().split('T')[0]
    };

    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    form.reset();
    displayPosts();
  });
}

function showEditForm(post) {
  const form = document.getElementById('edit-post-form');
  form.classList.remove('hidden');

  document.getElementById('edit-title').value = post.title;
  document.getElementById('edit-content').value = post.content;
  document.getElementById('edit-image').value = post.image;

  form.onsubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      id: post.id,
      title: document.getElementById('edit-title').value,
      content: document.getElementById('edit-content').value,
      image: document.getElementById('edit-image').value,
      author: post.author, // Preserve original author
      date: post.date // Preserve original date
    };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.map(p => (p.id === post.id ? updatedPost : p));
    localStorage.setItem('posts', JSON.stringify(posts));
    form.classList.add('hidden');
    displayPosts();
    loadPostDetail(post.id);
  };

  document.getElementById('cancel-edit').onclick = () => {
    form.classList.add('hidden');
  };
}

function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem('posts', JSON.stringify(posts));
  document.getElementById('post-detail').innerHTML = `<p class="text-gray-500 italic">Select a post to view details.</p>`;
  displayPosts();
}