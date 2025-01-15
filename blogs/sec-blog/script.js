// Fetch blog data from a JSON file
fetch("../blogData.json")
  .then((response) => response.json())
  .then((data) => {
    // Populate blog title, author, and content
    document.querySelector(".blog-title").innerText = data.title;
    document.querySelector("#author-img").src = data.authorImage;
    document.querySelector(".author-name").innerText = data.authorName;
    document.querySelector(
      ".publish-date"
    ).innerText = `Published on ${data.publishDate}`;
    document.querySelector("#blog-content").innerHTML = data.content;
  })
  .catch((error) => console.error("Error fetching the blog data:", error));

//select the notification element
const notification = document.getElementById("copy-notification");

// Setup share options
function setupShareButton(
  shareButtonId,
  shareOptionsId,
  copyLinkId,
  whatsappId
) {
  const shareButton = document.getElementById(shareButtonId);
  const shareOptions = document.getElementById(shareOptionsId);
  const copyLinkButton = document.getElementById(copyLinkId);
  const whatsappLink = document.getElementById(whatsappId);

  // Toggle share options visibility
  shareButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click from propagating
    const isVisible = shareOptions.style.display === "flex";

    // Hide all other share options
    document.querySelectorAll(".share-options").forEach((element) => {
      element.style.display = "none";
    });

    if (!isVisible) {
      // Get button position and size
      const rect = shareButton.getBoundingClientRect();
      shareOptions.style.top = `${rect.bottom + window.scrollY}px`; // Set top relative to the button
      shareOptions.style.left = `${rect.left + window.scrollX}px`; // Align left with the button
      shareOptions.style.display = "flex";
    } else {
      shareOptions.style.display = "none";
    }
  });

  // Copy link to clipboard
  copyLinkButton.addEventListener("click", () => {
    const blogURL = window.location.href;
    navigator.clipboard.writeText(blogURL).then(() => {
      showNotification(notification, "Link copied to clipboard!");
    });
  });

  // WhatsApp sharing link
  whatsappLink.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    "Check out this blog: " + window.location.href
  )}`;
}

// Close share options when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".share-options").forEach((element) => {
    element.style.display = "none";
  });
});

setupShareButton(
  "share-button",
  "share-options",
  "copy-link",
  "whatsapp-share"
);
setupShareButton(
  "footer-share-button",
  "footer-share-options",
  "footer-copy-link",
  "footer-whatsapp-share"
);

function showNotification(element, message) {
  element.textContent = message;
  element.classList.add("show");
  element.classList.remove("hidden");

  // Hide the notification after 2 seconds
  setTimeout(() => {
    element.classList.add("hidden");
    element.classList.remove("show");
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-btn");
  const blogPostsContainer = document.getElementById("blog-posts-container");

  let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  // Function to display posts (main blog page)
  function displayPosts(posts) {
    if (blogPostsContainer) {
      blogPostsContainer.innerHTML = ""; // Clear any existing posts

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
  }

  // Function to fetch blog data and store it
  function fetchBlogData() {
    if (blogPosts.length === 0) {
      fetch("../assets/data/blogs.json") // Path to your blog data file
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load blog data");
          }
          return response.json();
        })
        .then((data) => {
          blogPosts = data; // Store the blog posts data
          localStorage.setItem("blogPosts", JSON.stringify(blogPosts)); // Save data to localStorage
        })
        .catch((error) => {
          console.error("Error loading blog posts:", error);
        });
    }
  }

  // Initially fetch blog data (but don't display anything)
  fetchBlogData();

  // Search functionality
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {
      // If search term is empty, clear the display
      blogPostsContainer.innerHTML = "";
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
      // If search term is empty, clear the display
      blogPostsContainer.innerHTML = "";
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
});

document.addEventListener("DOMContentLoaded", () => {
  const blogPostsContainer = document.getElementById("blogscontainer");

  // Fetch the JSON data
  fetch("../data/blogs.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load JSON data.");
      }
      return response.json();
    })
    .then((data) => {
      // Loop through the data and create HTML for each blog post
      const limitedata = data.slice(0, 3);
      limitedata.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");

        postElement.innerHTML = `
          <img src="${post.image}" alt="${post.title}">
          <div>
            <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
            <p><em>${post.date}</em></p>
            <p>${post.summary}</p>
          </div>
        `;

        blogPostsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching or displaying JSON data:", error);
      blogPostsContainer.innerHTML = `<p style="color: red;">Failed to load blog posts.</p>`;
    });
});
