// --- TOGGLE SAVED PANEL FUNCTION ---
function toggleSavedPanel() {
    const drawer = document.getElementById('saved-drawer');
    const overlay = document.getElementById('saved-overlay');
    const body = document.body;

    const isClosed = drawer.classList.contains('translate-x-full');

    if (isClosed) {
        // Open
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        body.classList.add('overflow-hidden'); // Prevent scrolling
    } else {
        // Close
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        body.classList.remove('overflow-hidden');
    }
}


// --- LOAD SAVED COURSES INTO DRAWER ---
function loadSavedCourses() {
    const listContainer = document.getElementById('saved-list');
    const savedCourses = JSON.parse(localStorage.getItem('learnify_saved')) || [];

    function getCourseUrl(course) {
        const fallbackById = {
            'python-101': './course/python-course-detail.html',
            'js-303': './course/javascript-course-detail.html',
            'react-202': './course/react-course-detail.html',
            'csharp-1010': './course/csharp-course-detail.html',
            'ds-606': './course/datascience-course-detail.html',
            'flutter-707': './course/flutter-course-detail.html',
            'mern-505': './course/fullstack-course-detail.html',
            'php-909': './course/php-course-detail.html',
            'uiux-808': './course/uiux-course-detail.html'
        };

        const raw = (course.link || '').trim();

        if (!raw) {
            return fallbackById[course.id] || '#';
        }

        if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('./') || raw.startsWith('../') || raw.startsWith('/')) {
            return raw;
        }

        if (raw.startsWith('course/')) {
            return `./${raw}`;
        }

        if (raw.endsWith('-course-detail.html')) {
            return `./course/${raw}`;
        }

        return fallbackById[course.id] || '#';
    }

    // Clear current list (keep the empty state hidden for now)
    listContainer.innerHTML = '';

    if (savedCourses.length === 0) {
        // Show Empty State
        listContainer.innerHTML = `
                <div id="empty-state" class="flex flex-col items-center justify-center h-64 text-center">
                    <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <i class="fa-regular fa-bookmark text-2xl text-gray-400"></i>
                    </div>
                    <p class="text-gray-500 dark:text-gray-400">No courses saved yet.</p>
                    <p class="text-xs text-gray-400 mt-1">Click the save button on a video to add it here.</p>
                </div>`;
        return;
    }

    // Generate HTML for each saved course
    savedCourses.forEach(course => {
        const courseUrl = getCourseUrl(course);
        const itemHTML = `
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 hover:border-primary/50 transition cursor-pointer group relative">
                    <a href="${courseUrl}" class="absolute inset-0 z-0" aria-label="Open ${course.title}"></a>
                    <div class="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <img src="${course.image}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-grow z-10 pointer-events-none">
                        <h4 class="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">${course.title}</h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${course.lessons} • ${course.duration}</p>
                    </div>
                    <button onclick="removeCourse('${course.id}')" class="z-20 text-gray-400 hover:text-red-500 transition px-1">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        listContainer.innerHTML += itemHTML;
    });
}

// --- REMOVE COURSE FUNCTION ---
function removeCourse(id) {
    let savedCourses = JSON.parse(localStorage.getItem('learnify_saved')) || [];
    // Filter out the item
    savedCourses = savedCourses.filter(course => course.id !== id);
    // Save back
    localStorage.setItem('learnify_saved', JSON.stringify(savedCourses));
    // Reload the UI
    loadSavedCourses();
}

// Load courses whenever the drawer is opened
// (We hook into your existing toggle function)
const originalToggle = window.toggleSavedPanel; // Save your old function
window.toggleSavedPanel = function () {
    // Run the original animation logic
    const drawer = document.getElementById('saved-drawer');
    const overlay = document.getElementById('saved-overlay');
    const body = document.body;
    const isClosed = drawer.classList.contains('translate-x-full');

    if (isClosed) {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        body.classList.add('overflow-hidden');

        // ** NEW: Load data when opening **
        loadSavedCourses();
    } else {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        body.classList.remove('overflow-hidden');
    }
}

// --- MOBILE MENU DRAWER ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu-drawer');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;

    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');

    // Hide after transition so the close motion is visible.
    window.setTimeout(() => {
        if (mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.add('hidden');
        }
    }, 300);
}

window.closeMobileMenu = closeMobileMenu;

function openMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;

    mobileMenu.classList.remove('hidden');
    mobileMenuOverlay.classList.remove('hidden');

    requestAnimationFrame(() => {
        mobileMenu.classList.remove('translate-x-full');
    });

    document.body.classList.add('overflow-hidden');
}

if (mobileMenuButton && mobileMenu && mobileMenuOverlay) {
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden') || mobileMenu.classList.contains('translate-x-full');
        if (isHidden) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });

    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden', 'translate-x-full');
            mobileMenuOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        } else {
            closeMobileMenu();
        }
    });
}


