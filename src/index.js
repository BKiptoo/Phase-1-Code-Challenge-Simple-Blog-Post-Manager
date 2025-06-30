const baseURL = 'http://localhost:3000/posts';

document.addEventListener('DOMContentLoaded', () => {
  displayPosts();
  setupNewPostForm();
});

function displayPosts() {
  fetch(baseURL)
    .then(res => res.json())
    .then(posts => {
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
    })
    .catch(() => {
      document.getElementById('post-detail').innerHTML = `<p class="text-red-500 italic">Error loading posts.</p>`;
    });
}

function loadPostDetail(id) {
  fetch(`${baseURL}/${id}`)
    .then(res => res.json())
    .then(post => {
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
    });
}

function setupNewPostForm() {
  const form = document.getElementById('new-post-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
      title: form.title.valueOf,
      content: form.content.value,
      image: form.image.value,
      author: form.author.value,
      date: new Date().toISOString().split('T')[0]
    };

    fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        displayPosts();
      });
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
      title: document.getElementById('edit-title').value,
      content: document.getElementById('edit-content').value,
      image: document.getElementById('edit-image').value
    };

    fetch(`${baseURL}/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    })
      .then(() => {
        form.classList.add('hidden');
        displayPosts();
        loadPostDetail(post.id);
      });
  };

  document.getElementById('cancel-edit').onclick = () => {
    form.classList.add('hidden');
  };
}

function deletePost(id) {
  fetch(`${baseURL}/${id}`, { method: 'DELETE' })
    .then(() => {
      document.getElementById('post-detail').innerHTML = `<p class="text-gray-500 italic">Select a post to view details.</p>`;
      displayPosts();
    });
}
