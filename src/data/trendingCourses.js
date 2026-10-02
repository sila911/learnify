export const trendingCourses = [
  {
    id: 1,
    title: "Python for Beginners",
    description: "Master Python from scratch. Automate tasks, build apps, and analyze data.",
    fullDescription: "Python is one of the most popular and versatile programming languages in the world. This course is designed to take you from absolute zero to a competent programmer. You'll learn the core concepts of Python, including variables, data types, control structures, and functions, before moving on to real-world applications like data analysis and automation.",
    learningPoints: [
      "Core Python syntax and data structures",
      "Object-Oriented Programming (OOP) in Python",
      "Working with libraries like Pandas and NumPy",
      "Automating repetitive tasks with scripts",
      "Building basic web scrapers",
      "Error handling and debugging best practices"
    ],
    curriculum: [
      { id: 'v1', title: "Introduction to Python", duration: "10:20", youtubeId: "rfscVS0vtbw" },
      { id: 'v2', title: "Setting up Environment", duration: "15:45", youtubeId: "YYXdZ0dpCXQ" },
      { id: 'v3', title: "Variables and Data Types", duration: "20:10", youtubeId: "khKwNjPnAQQ" },
      { id: 'v4', title: "Control Flow: If/Else", duration: "12:30", youtubeId: "Zp5MuPOtsSY" }
    ],
    instructor: {
      name: "Dara HENG",
      role: "Python Expert",
      avatar: "https://i.pinimg.com/736x/2a/cf/9a/2acf9a571bfc454d37877e2c5a136bda.jpg"
    },
    image: "https://i.pinimg.com/736x/90/95/9e/90959ebebaaefe84be4a9182bac96cc2.jpg",
    category: "Development",
    rating: 4.9,
    lessons: 18,
    duration: "8h 30m",
    tag: "Best Viewer",
    link: "#",
    quiz: [
      {
        id: 'q1_1',
        question: "What is the correct output of print(type([])) in Python?",
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"],
        answer: 1
      },
      {
        id: 'q1_2',
        question: "Which keyword is used to define a custom function in Python?",
        options: ["func", "define", "def", "function"],
        answer: 2
      },
      {
        id: 'q1_3',
        question: "How do you write comments in Python code?",
        options: ["// this is a comment", "/* this is a comment */", "# this is a comment", "<!-- this is a comment -->"],
        answer: 2
      }
    ]
  },
  {
    id: 2,
    title: "Modern JavaScript: From Scratch",
    description: "Learn the language of the web. Master ES6+, Async/Await, DOM manipulation, and modern tooling.",
    fullDescription: "JavaScript is the heartbeat of the modern web. In this course, you'll go beyond the basics and master the features that make modern JavaScript so powerful. We'll cover everything from core fundamentals to advanced topics like asynchronous programming, modularity, and working with modern build tools.",
    learningPoints: [
      "ES6+ features and modern syntax",
      "Asynchronous programming with Promises and Async/Await",
      "DOM Manipulation and Event Handling",
      "Working with APIs and JSON data",
      "Functional programming concepts",
      "Tooling with Webpack and Babel"
    ],
    curriculum: [
      { id: 'v5', title: "JS Fundamentals", duration: "12:45", youtubeId: "hdI2bqOjyQM" },
      { id: 'v6', title: "Understanding the DOM", duration: "18:20", youtubeId: "01ys73ndT60" },
      { id: 'v7', title: "Async/Await Explained", duration: "22:15", youtubeId: "V_Kr9OSfDeU" }
    ],
    instructor: {
      name: "Sila SEM",
      role: "Full Stack Developer",
      avatar: "./img/sila.jpg"
    },
    image: "https://i.pinimg.com/736x/e3/d2/f0/e3d2f0bac1bbcb1e3e328d8685f071cb.jpg",
    category: "Language",
    rating: 5.0,
    lessons: 32,
    duration: "14h 45m",
    tag: "Essential",
    link: "#",
    quiz: [
      {
        id: 'q2_1',
        question: "Which of the following is NOT a native JavaScript data type?",
        options: ["Undefined", "Boolean", "Float", "String"],
        answer: 2
      },
      {
        id: 'q2_2',
        question: "Which keyword declares a block-scoped local variable in modern JavaScript (ES6)?",
        options: ["var", "let", "global", "define"],
        answer: 1
      },
      {
        id: 'q2_3',
        question: "What does the strict equality (===) operator check in JavaScript?",
        options: ["Value equality only", "Type equality only", "Both value and type equality", "Assignment"],
        answer: 2
      }
    ]
  },
  {
    id: 3,
    title: "Modern React.js Masterclass",
    description: "Build dynamic, high-performance web applications with Hooks, Context API, and Redux.",
    fullDescription: "React is the most popular library for building user interfaces. This masterclass is designed for developers who want to stay ahead of the curve. You'll learn how to build scalable, high-performance applications using the latest React features, including Hooks, the Context API, and advanced state management with Redux.",
    learningPoints: [
      "Component-based architecture and JSX",
      "Managing state with Hooks (useState, useEffect, useMemo)",
      "Global state management with Context API and Redux",
      "Routing with React Router",
      "Performance optimization techniques",
      "Testing React components with Jest and RTL"
    ],
    curriculum: [
      { id: 'v8', title: "React Basics", duration: "15:30", youtubeId: "w7ejDZ8SWv8" },
      { id: 'v9', title: "Hooks Deep Dive", duration: "25:00", youtubeId: "dpw9EHDh2bM" },
      { id: 'v10', title: "State Management with Context", duration: "20:45", youtubeId: "5LrDIWkK_Bc" }
    ],
    instructor: {
      name: "Sila SEM",
      role: "React Specialist",
      avatar: "./img/sila.jpg"
    },
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    category: "Frontend",
    rating: 4.8,
    lessons: 24,
    duration: "10h 15m",
    tag: "Popular",
    link: "#",
    quiz: [
      {
        id: 'q3_1',
        question: "Which React hook is used to perform side effects in functional components?",
        options: ["useState", "useContext", "useEffect", "useReducer"],
        answer: 2
      },
      {
        id: 'q3_2',
        question: "What is the primary purpose of keys in React lists?",
        options: ["To uniquely identify items and help React track updates", "To style components", "To bind events", "To generate unique numbers"],
        answer: 0
      },
      {
        id: 'q3_3',
        question: "Can functional components hold reactive state in modern React?",
        options: ["No, only class components hold state", "Yes, using the useState hook", "Only when using Redux", "Only when using Context API"],
        answer: 1
      }
    ]
  },
  {
    id: 4,
    title: "Git & GitHub Version Control",
    description: "Collaborate effectively. Learn to manage code versions, branch, merge, and contribute to open source.",
    fullDescription: "Version control is an essential skill for every developer. This course will teach you everything you need to know about Git and GitHub, from basic commands to advanced workflows. You'll learn how to collaborate with others, manage merge conflicts, and contribute to open-source projects with confidence.",
    learningPoints: [
      "Basic Git commands (init, add, commit, push, pull)",
      "Branching and merging strategies",
      "Resolving merge conflicts like a pro",
      "Working with remote repositories on GitHub",
      "Pull Request (PR) workflow and code reviews",
      "Using Git for open-source contributions"
    ],
    curriculum: [
      { id: 'v11', title: "Git Basics", duration: "10:00", youtubeId: "8JJ101D3knE" },
      { id: 'v12', title: "Branching and Merging", duration: "15:30", youtubeId: "oPpnCh7InLY" }
    ],
    instructor: {
      name: "Sodalin SUN",
      role: "DevOps Engineer",
      avatar: "https://i.pinimg.com/1200x/f1/8f/3c/f18f3c39b196ebfdf6ecf7ca543691c6.jpg"
    },
    image: "https://i.pinimg.com/736x/ae/45/78/ae457871a5bef568338e8c73043afcf2.jpg",
    category: "DevOps",
    rating: 4.7,
    lessons: 12,
    duration: "6h 30m",
    tag: "Essential",
    link: "#",
    quiz: [
      {
        id: 'q4_1',
        question: "Which command initializes a new local Git repository?",
        options: ["git add", "git commit", "git init", "git clone"],
        answer: 2
      },
      {
        id: 'q4_2',
        question: "How do you stage all modified files for a commit in Git?",
        options: ["git stage", "git add .", "git save", "git push"],
        answer: 1
      },
      {
        id: 'q4_3',
        question: "What does the command 'git pull' do?",
        options: ["Fetches remote updates and merges them automatically", "Only downloads remote updates", "Pushes commits to github", "Deletes branches"],
        answer: 0
      }
    ]
  },
  {
    id: 5,
    title: "Data Structures & Algorithms in Java",
    description: "Master the fundamentals of data structures and algorithms. Prepare for coding interviews and improve problem-solving skills.",
    fullDescription: "Data structures and algorithms are the building blocks of efficient programming. This course will take you through the most important data structures (arrays, linked lists, stacks, queues, trees, graphs) and algorithms (sorting, searching, dynamic programming) using Java. You'll also get plenty of practice with coding problems that are commonly asked in technical interviews.",
    learningPoints: [
      "Core data structures and their implementations",
      "Algorithm design and analysis",
      "Time and space complexity considerations",
      "Problem-solving strategies for coding interviews"
    ],
    curriculum: [
      { id: 'v13', title: "Introduction to Data Structures", duration: "15:00", youtubeId: "zg9ih6SVupc" },
      { id: 'v14', title: "Algorithms Fundamentals", duration: "20:00", youtubeId: "U85F_yG9gqg" }
    ],
    instructor: {
      name: "Dara HENG",
      role: "Java Developer",
      avatar: "https://i.pinimg.com/736x/2a/cf/9a/2acf9a571bfc454d37877e2c5a136bda.jpg"
    },
    image: "https://i.pinimg.com/736x/ae/45/78/ae457871a5bef568338e8c73043afcf2.jpg",
    category: "Programming",
    rating: 4.9,
    lessons: 28,
    duration: "14h 00m",
    tag: "Popular",
    link: "#",
    quiz: [
      {
        id: 'q5_1',
        question: "What is the worst-case search time complexity in a skewed Binary Search Tree (BST)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 2
      },
      {
        id: 'q5_2',
        question: "Which data structure operates on a Last-In-First-Out (LIFO) basis?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        answer: 1
      },
      {
        id: 'q5_3',
        question: "Which sorting algorithm guarantees a worst-case time complexity of O(n log n)?",
        options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Merge Sort"],
        answer: 3
      }
    ]
  }
];
