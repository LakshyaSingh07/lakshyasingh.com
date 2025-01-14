document.addEventListener("DOMContentLoaded", () => {
  const blogPostsContainer = document.getElementById("blog-posts-container");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-btn");

  // Store the full list of blog posts
  let blogPosts = [];

  // Fetch the JSON data
  fetch("../assets/data/blogs.json") // Adjust the path to your JSON file
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load blog data");
      }
      return response.json();
    })
    .then((data) => {
      blogPosts = data; // Store the blog posts data

      // Generate HTML for each blog post
      function displayPosts(posts) {
        // Clear the current blog posts
        blogPostsContainer.innerHTML = "";

        // Create and append each post to the container
        posts.forEach((post) => {
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
      }

      // Initially display all blog posts
      displayPosts(blogPosts);

      // Search functionality
      searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === "") {
          // If search term is empty, display all posts
          displayPosts(blogPosts);
        } else {
          // Filter posts based on the search term
          const filteredPosts = blogPosts.filter((post) => {
            return (
              post.title.toLowerCase().includes(searchTerm) ||
              post.summary.toLowerCase().includes(searchTerm)
            );
          });

          // Display the filtered posts
          displayPosts(filteredPosts);
        }
      });

      // Optional: Implement live search (trigger search as user types)
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === "") {
          // If search term is empty, display all posts
          displayPosts(blogPosts);
        } else {
          // Filter posts based on the search term
          const filteredPosts = blogPosts.filter((post) => {
            return (
              post.title.toLowerCase().includes(searchTerm) ||
              post.summary.toLowerCase().includes(searchTerm)
            );
          });

          // Display the filtered posts
          displayPosts(filteredPosts);
        }
      });
    })
    .catch((error) => {
      console.error("Error loading blog posts:", error);
    });
});
