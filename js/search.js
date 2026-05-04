// --- COURSE DATA ---
const coursesData = [
  {
    id: "python-101",
    title: "Python for Beginners",
    category: "Development",
    link: "./course/python-course-detail.html",
    image:
      "https://i.pinimg.com/736x/90/95/9e/90959ebebaaefe84be4a9182bac96cc2.jpg",
    duration: "8h 30m",
    lessons: 18,
    rating: 4.9,
    description:
      "Master Python from scratch. Automate tasks, build apps, and analyze data.",
  },
  {
    id: "js-303",
    title: "Modern JavaScript: From Scratch",
    category: "Language",
    link: "./course/javascript-course-detail.html",
    image:
      "https://i.pinimg.com/736x/e3/d2/f0/e3d2f0bac1bbcb1e3e328d8685f071cb.jpg",
    duration: "14h 45m",
    lessons: 32,
    rating: 5.0,
    description:
      "Learn the language of the web. Master ES6+, Async/Await, DOM manipulation, and modern tooling.",
  },
  {
    id: "react-202",
    title: "Modern React.js Masterclass",
    category: "Frontend",
    link: "./course/react-course-detail.html",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    duration: "10h 15m",
    lessons: 24,
    rating: 4.8,
    description:
      "Build dynamic, high-performance web applications with Hooks, Context API, and Redux.",
  },
  {
    id: "git-001",
    title: "Git & GitHub Version Control",
    category: "DevOps",
    link: "./course/git-course-detail.html",
    image:
      "https://i.pinimg.com/736x/ae/45/78/ae457871a5bef568338e8c73043afcf2.jpg",
    duration: "6h 30m",
    lessons: 12,
    rating: 4.7,
    description:
      "Collaborate effectively. Learn to manage code versions, branch, merge, and contribute to open source.",
  },
  {
    id: "mern-505",
    title: "The Complete MERN Stack Bootcamp",
    category: "Full Stack",
    link: "./course/fullstack-course-detail.html",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    duration: "22h 10m",
    lessons: 48,
    rating: 4.9,
    description:
      "Become a full-stack developer. Build scalable web apps with MongoDB, Express, React, and Node.js.",
  },
  {
    id: "ds-606",
    title: "Data Science & Machine Learning",
    category: "Data Science",
    link: "./course/datascience-course-detail.html",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    duration: "35h 20m",
    lessons: 50,
    rating: 4.8,
    description:
      "Master Python for data analysis. Learn Pandas, NumPy, Matplotlib, and build Machine Learning models.",
  },
  {
    id: "flutter-707",
    title: "Flutter & Dart: The Complete Guide",
    category: "Flutter",
    link: "./course/flutter-course-detail.html",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop",
    duration: "28h 15m",
    lessons: 42,
    rating: 4.9,
    description:
      "Build native iOS and Android apps with a single codebase. Master Dart, Flutter Widgets, and State Management.",
  },
  {
    id: "uiux-808",
    title: "Complete UI/UX Design Masterclass",
    category: "Design",
    link: "./course/uiux-course-detail.html",
    image:
      "https://i.pinimg.com/736x/60/ab/f9/60abf9f0c6d7c5904f929f2d636d09c9.jpg",
    duration: "18h 45m",
    lessons: 36,
    rating: 4.7,
    description:
      "Design stunning apps and websites. Master Figma, wireframing, prototyping, and user research.",
  },
  {
    id: "php-909",
    title: "PHP & MySQL for Beginners",
    category: "Server-Side",
    link: "./course/php-course-detail.html",
    image:
      "https://i.pinimg.com/736x/a6/31/40/a63140dccb6542b59c266944ac5b6cda.jpg",
    duration: "5h 30m",
    lessons: 15,
    rating: 4.6,
    description:
      "Build dynamic websites from scratch. Learn server-side logic, database management, and user authentication.",
  },
  {
    id: "csharp-1010",
    title: "Master C# & .NET Core",
    category: "Backend",
    link: "./course/csharp-course-detail.html",
    image:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1000&auto=format&fit=crop",
    duration: "12h 00m",
    lessons: 28,
    rating: 4.8,
    description:
      "Build powerful desktop, web, and mobile apps. Learn Object-Oriented Programming (OOP) and the .NET framework.",
  },
];

// --- SEARCH MODAL STATE ---
let selectedResultIndex = -1;

// --- TOGGLE SEARCH MODAL ---
function toggleSearchModal() {
  const modal = document.getElementById("search-modal");
  const input = document.getElementById("search-input");

  const isHidden = modal.classList.contains("hidden");

  if (isHidden) {
    modal.classList.remove("hidden");
    setTimeout(() => {
      input.focus();
    }, 100);
  } else {
    closeSearchModal();
  }
}

// --- CLOSE SEARCH MODAL ---
function closeSearchModal(event) {
  // If event is provided and it's the modal background click, close it
  if (event && event.target.id !== "search-modal") return;

  const modal = document.getElementById("search-modal");
  const input = document.getElementById("search-input");

  modal.classList.add("hidden");
  input.value = "";
  document.getElementById("search-results").innerHTML = `
        <div class="p-6 text-center text-gray-500 dark:text-gray-400">
            <p class="text-sm">Start typing to search courses...</p>
        </div>
    `;
  selectedResultIndex = -1;
}

// --- SEARCH COURSES ---
function searchCourses(query) {
  const results = document.getElementById("search-results");

  if (!query.trim()) {
    results.innerHTML = `
            <div class="p-6 text-center text-gray-500 dark:text-gray-400">
                <p class="text-sm">Start typing to search courses...</p>
            </div>
        `;
    selectedResultIndex = -1;
    return;
  }

  const lowerQuery = query.toLowerCase();
  const filtered = coursesData.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.category.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery),
  );

  if (filtered.length === 0) {
    results.innerHTML = `
            <div class="p-6 text-center text-gray-500 dark:text-gray-400">
                <p class="text-sm">No courses found for "<strong>${query}</strong>"</p>
                <p class="text-xs mt-2">Try searching for different keywords.</p>
            </div>
        `;
    selectedResultIndex = -1;
    return;
  }

  results.innerHTML = filtered
    .map(
      (course, index) => `
        <a 
            href="${course.link}" 
            class="search-result-item flex items-start gap-3 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer group" 
            data-index="${index}"
        >
            <div class="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow min-w-0">
                <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition line-clamp-1">
                    ${course.title}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span class="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        ${course.category}
                    </span>
                </p>
                <div class="flex items-center gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span><i class="fa-solid fa-star text-yellow-400"></i> ${course.rating}</span>
                    <span><i class="fa-regular fa-clock"></i> ${course.duration}</span>
                    <span><i class="fa-solid fa-video"></i> ${course.lessons} Lessons</span>
                </div>
            </div>
            <i class="fa-solid fa-arrow-right text-gray-300 dark:text-gray-600 group-hover:text-primary transition"></i>
        </a>
    `,
    )
    .join("");

  selectedResultIndex = -1;

  // Add click handlers to results
  document.querySelectorAll(".search-result-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.button === 0) {
        // Left click only
        window.location.href = item.href;
      }
    });
  });
}

// --- KEYBOARD NAVIGATION ---
function handleSearchKeyboard(event) {
  const modal = document.getElementById("search-modal");
  const results = document.querySelectorAll(".search-result-item");

  if (event.key === "Escape") {
    closeSearchModal();
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (results.length > 0) {
      selectedResultIndex = Math.min(
        selectedResultIndex + 1,
        results.length - 1,
      );
      highlightResult(results);
      scrollToResult(results);
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (results.length > 0) {
      selectedResultIndex = Math.max(selectedResultIndex - 1, 0);
      highlightResult(results);
      scrollToResult(results);
    }
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (selectedResultIndex >= 0 && results.length > 0) {
      results[selectedResultIndex].click();
    }
  }
}

function highlightResult(results) {
  results.forEach((item, index) => {
    if (index === selectedResultIndex) {
      item.classList.add("bg-gray-100", "dark:bg-gray-700");
    } else {
      item.classList.remove("bg-gray-100", "dark:bg-gray-700");
    }
  });
}

function scrollToResult(results) {
  if (selectedResultIndex >= 0) {
    results[selectedResultIndex].scrollIntoView({ block: "nearest" });
  }
}

// --- GLOBAL KEYBOARD SHORTCUT (Ctrl+K or Cmd+K) ---
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();
    toggleSearchModal();
  }
});

// --- SEARCH INPUT LISTENER ---
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchToggle = document.getElementById("search-toggle");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchCourses(e.target.value);
    });

    searchInput.addEventListener("keydown", handleSearchKeyboard);
  }

  if (searchToggle) {
    searchToggle.addEventListener("click", toggleSearchModal);
  }
});
