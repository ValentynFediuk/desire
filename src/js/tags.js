// Import variables and functions from pagination.js
const allPosts = Array.from(document.querySelectorAll('.blog__post'));
// Use the existing filteredPosts from pagination.js
// let filteredPosts = [...allPosts]; - removed to avoid conflicts
// let currentPage = 1; - removed to avoid conflicts

const tagItems = document.querySelectorAll('.sidebar__tags-list-item');
const input = document.querySelector('input[name="search"]');
const sidebarItems = document.querySelectorAll('.sidebar__categories-list-item');

// All posts should now use data-tags instead of data-kind
allPosts.forEach(post => {
  // If post has data-kind but no data-tags, copy the value to data-tags
  if (!post.dataset.tags && post.dataset.kind) {
    post.dataset.tags = post.dataset.kind;
  }
  // If post has both data-kind and data-tags with the same value, remove data-kind
  else if (post.dataset.tags && post.dataset.kind && post.dataset.tags === post.dataset.kind) {
    delete post.dataset.kind;
  }
  // If post has both data-kind and data-tags with different values, merge them
  else if (post.dataset.tags && post.dataset.kind && post.dataset.tags !== post.dataset.kind) {
    post.dataset.tags = `${post.dataset.tags},${post.dataset.kind}`;
    delete post.dataset.kind;
  }
});

tagItems.forEach(tagItem => {
  tagItem.style.cursor = 'pointer';

  tagItem.addEventListener('click', () => {
    // Use the data-tag attribute directly instead of normalizing text content
    const normalizedTag = tagItem.dataset.tag;

    // Update the global filteredPosts variable
    window.filteredPosts = allPosts.filter(post => {
      // Only check data-tags attribute
      const tags = post.dataset.tags ? post.dataset.tags.toLowerCase().split(',').map(t => t.trim()) : [];

      // Now that we've normalized the tag to match the data attributes, we can use exact matching
      return tags.includes(normalizedTag);
    });

    // Reset to first page
    window.currentPage = 1;

    // Update pagination and display
    if (typeof window.createPagination === 'function') {
      window.createPagination(window.filteredPosts);
      window.showPage(window.currentPage, window.filteredPosts);
    } else {
      // Fallback if pagination functions aren't available
      allPosts.forEach(post => {
        post.style.display = 'none';
      });
      window.filteredPosts.forEach(post => {
        post.style.display = 'block';
      });
    }

    // Update UI to show active tag
    tagItems.forEach(el => el.classList.remove('active'));
    tagItem.classList.add('active');

    // Clear search input and category selection
    if (input) input.value = '';
    if (sidebarItems) {
      sidebarItems.forEach(el => el.classList.remove('active'));
    }
  });
});
