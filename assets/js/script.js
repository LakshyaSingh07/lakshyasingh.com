document.addEventListener("DOMContentLoaded", () => {
  const blogPostsContainer = document.getElementById("blog-posts-container");

  // Fetch the JSON data
  fetch("../assets/data/blogs.json") // Adjust the path to your JSON file
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load blog data");
      }
      return response.json();
    })
    .then((blogPosts) => {
      // Generate HTML for each blog post
      blogPosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");

        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-content">
              <h3><a href="${post.link}">${post.title}</a></h3>
              <p><em>${post.date}</em></p>
              <p>${post.summary}</p>
            </div>
          `;

        blogPostsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error loading blog posts:", error);
    });
});
