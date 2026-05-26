// EduPulse Student News Platform JS

// NewsAPI Key & Backup endpoint configurations
const API_KEY = '0f9c035fc81b464585ec7b1d609f8175';

// High-fidelity local database of fallback articles representing multiple categories
const FALLBACK_ARTICLES = [
    {
        id: "world-1",
        title: "Global Climate Summit Announces New Student Research Grants for 2026",
        description: "New funding opportunities open up for student-led climate research projects starting this academic year.",
        content: "The International Climate Action Council has officially earmarked over $25 million in funding specifically dedicated to high-school and university-level research projects. The grants focus on actionable local initiatives such as urban heat island mitigations, organic solar cell architectures, and community-level water conservation technologies.\n\nApplications open on June 1st, 2026, and require a detailed project proposal backed by an academic sponsor. Awardees will receive not only financial backing up to $50,000 but also direct mentorship from leading climatologists and access to global university laboratories.",
        url: "https://www.un.org/climatechange",
        urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600",
        publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        category: "world",
        source: "Global Green Initiative"
    },
    {
        id: "world-2",
        title: "Bilingual Curriculum Standards Adopted Across 120 International Schools",
        description: "A major educational shift aims to foster cultural dexterity and language parity among high school graduates.",
        content: "Starting in the Fall semester of 2026, a consortium of 120 international schools across Europe and Asia will pilot a fully integrated dual-language curriculum. The initiative mandate dictates that core humanities and social sciences be taught in alternating languages weekly.\n\nResearchers believe this immersive approach increases cognitive flexibility and preps students for an increasingly globalized job market. Preliminary test scores from pilot programs in Zurich and Singapore show a marked improvement in analytical writing and verbal reasoning skills.",
        url: "https://www.unesco.org/education",
        urlToImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600",
        publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        category: "world",
        source: "UNESCO Education Desk"
    },
    {
        id: "tech-1",
        title: "Next-Gen Quantum Processors Enter Commercial Pilot Phase",
        description: "Silicon Valley startups spin up cloud access to 200-qubit systems, offering free tiers for university researchers.",
        content: "Quantum computing is taking its first major step out of academic labs and into practical pilot phases. A coalition of hardware startups has announced the deployment of a cloud-accessible, superconducting 200-qubit system. Crucially, the platform includes a zero-cost academic tier.\n\nStudents majoring in physics, computer science, and cryptography can apply for compute credits starting this week. Projects aiming to solve chemical simulation models and high-efficiency logistics optimization will receive priority scheduling.",
        url: "https://www.nature.com/articles/quantum",
        urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        category: "tech",
        source: "Quantum Horizon Journal"
    },
    {
        id: "tech-2",
        title: "Open-Source LLMs Achieve Full Parity with Proprietary Giants",
        description: "A new lightweight model parameter architecture allows advanced reasoning tasks to run directly on consumer laptops.",
        content: "In a stunning breakthrough for decentralized AI, the open-source community has released 'Aether-3B', a model that scores identically to multi-billion parameter proprietary systems in coding and mathematical reasoning. By utilizing a highly optimized routing framework, the model fits entirely in a laptop's local VRAM.\n\nThis means student developers can build agentic systems, write code, and fine-tune reasoning engines locally without needing expensive cloud servers or incurring API costs.",
        url: "https://huggingface.co/models",
        urlToImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
        publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
        category: "tech",
        source: "HuggingFace Review"
    },
    {
        id: "science-1",
        title: "Deep Sea Exploration Robot Discovered 45 New Species in Mariana Trench",
        description: "Equipped with advanced biosensors and soft-gripping arms, the probe mapped unexplored volcanic thermal vents.",
        content: "A research vessel operating in the Western Pacific has reported unprecedented findings. Using an autonomous deep-sea robot dubbed 'Nautilus-X', scientists successfully gathered genetic data and video feeds from depths of over 8,000 meters.\n\nAmong the discoveries are unique bioluminescent crustaceans and bacteria that metabolize sulfur in extreme heat. Graduate biology students will begin DNA sequencing next month, presenting a golden opportunity for research co-authorships.",
        url: "https://www.noaa.gov/ocean-exploration",
        urlToImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600",
        publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
        category: "science",
        source: "Marine Science Quarterly"
    },
    {
        id: "science-2",
        title: "Astronomers Confirm First Earth-Sized Exoplanet in Stellar Habitable Zone",
        description: "Using the James Webb Space Telescope, researchers detected atmosphere molecules indicating water vapor.",
        content: "The James Webb Space Telescope has achieved another monumental milestone. Observations of the dwarf star system TOI-700 have confirmed an Earth-sized planet orbiting securely within its habitable zone, where liquid water could exist on the surface.\n\nSpectral data revealed clear signatures of carbon dioxide and water vapor in the atmosphere. The findings have ignited discussions about biosignatures, with collegiate physics groups setting up collaborative computational models to predict surface conditions.",
        url: "https://www.nasa.gov/webb",
        urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        publishedAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
        category: "science",
        source: "NASA Astrophysics"
    },
    {
        id: "edu-1",
        title: "Academic Journals Form Alliance for Free Open-Access Publications",
        description: "Over 500 journals sign the 'Open Academy Directive' to remove paywalls for student researchers.",
        content: "In a massive win for academic accessibility, major scientific and humanities publishers have formed the Open Academy Alliance. The agreement removes all reading fees and download paywalls for individuals browsing from verified high school or university IP addresses.\n\nThis will level the playing field for students at under-funded institutions, letting them read the latest peer-reviewed research papers without restrictive monthly subscription blockades.",
        url: "https://www.openaccess.org",
        urlToImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600",
        publishedAt: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
        category: "edu",
        source: "Educational Equity Board"
    },
    {
        id: "edu-2",
        title: "University Hackathon Circuits Set to Triple Prize Pools in 2026",
        description: "Major tech sponsors double down on collegiate code battles to recruit top talent directly from campuses.",
        content: "The tech industry's hunger for specialized AI and systems talent is sparking a boom in campus hackathons. Major cloud providers and software giants have announced a combined $3 million pool for student prizes across nationwide circuits.\n\nWinning teams will also receive fast-track interview cycles for summer internships and incubator grants to turn their hackathon prototypes into fully funded startup projects.",
        url: "https://mlh.io",
        urlToImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
        publishedAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
        category: "edu",
        source: "Major League Hacking"
    }
];

// App State Variables
let currentArticles = [...FALLBACK_ARTICLES];
let currentCategory = 'all';
let searchQuery = '';
let savedArticles = [];
let currentSpeech = null;
let isSpeechPlaying = false;
let currentFontSizeMultiplier = 1.0;
let currentArticleInReader = null;

// Weather configurations
const WEATHER_DATA = {
    "Bangalore": { temp: "26°C", desc: "scattered clouds", icon: "cloudy" },
    "London": { temp: "15°C", desc: "light drizzle", icon: "rainy" },
    "New York": { temp: "21°C", desc: "sunny & clear", icon: "sunny" },
    "Tokyo": { temp: "18°C", desc: "misty morning", icon: "misty" },
    "Sydney": { temp: "17°C", desc: "passing showers", icon: "rainy" }
};

// Weather SVGs
const WEATHER_ICONS = {
    sunny: `<svg viewBox="0 0 64 64" width="50" height="50"><circle cx="32" cy="32" r="12" fill="#eab308"/><path d="M32 8v6M32 50v6M15 15l4.2 4.2M44.8 44.8l4.2 4.2M8 32h6M50 32h6M15 49l4.2-4.2M44.8 19.2l4.2-4.2" stroke="#eab308" stroke-width="4" stroke-linecap="round"/></svg>`,
    cloudy: `<svg viewBox="0 0 64 64" width="50" height="50"><path d="M46 40a10 10 0 00-6-18 12 12 0 00-22 4 10 10 0 00-4 18h32z" fill="#94a3b8" stroke="#64748b" stroke-width="3" stroke-linejoin="round"/></svg>`,
    rainy: `<svg viewBox="0 0 64 64" width="50" height="50"><path d="M46 36a10 10 0 00-6-18 12 12 0 00-22 4 10 10 0 00-4 18h32z" fill="#475569" stroke="#334155" stroke-width="3" stroke-linejoin="round"/><path d="M24 46v6M32 46v6M40 46v6" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/></svg>`,
    misty: `<svg viewBox="0 0 64 64" width="50" height="50"><path d="M12 24h40M16 32h32M10 40h44M20 48h24" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/></svg>`
};

/* --- Initialize Application --- */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Theme Manager
    initThemeManager();

    // 2. Setup Saved Articles Manager (Local Storage)
    initBookmarks();

    // 3. Load news articles (Fetch + Fallback merger)
    fetchNewsData();

    // 4. Setup search, category pills, & modal listener bindings
    setupInteractionListeners();

    // 5. Run dynamic Weather and Student Welcome updates
    updateWelcomeBanner();
    updateWeatherWidget();
    setInterval(updateWelcomeBanner, 60000); // refresh time every minute
});

/* --- Theme Management --- */
function initThemeManager() {
    const savedTheme = localStorage.getItem("edupulse-theme") || "dark";
    setTheme(savedTheme);

    document.getElementById("btn-dark").addEventListener("click", () => setTheme("dark"));
    document.getElementById("btn-light").addEventListener("click", () => setTheme("light"));
    document.getElementById("btn-sepia").addEventListener("click", () => setTheme("sepia"));
}

function setTheme(theme) {
    const body = document.body;
    body.className = ""; // clear all themes

    // Remove active status on buttons
    document.querySelectorAll(".theme-btn").forEach(btn => btn.classList.remove("active"));

    if (theme === "light") {
        body.classList.add("light-theme");
        document.getElementById("btn-light").classList.add("active");
    } else if (theme === "sepia") {
        body.classList.add("sepia-theme");
        document.getElementById("btn-sepia").classList.add("active");
    } else {
        body.classList.add("dark-theme");
        document.getElementById("btn-dark").classList.add("active");
    }

    localStorage.setItem("edupulse-theme", theme);
}

/* --- Greeting & Clock Banner --- */
function updateWelcomeBanner() {
    const greetingEl = document.getElementById("user-greeting");
    const dateEl = document.getElementById("live-date");
    if (!greetingEl || !dateEl) return;

    const now = new Date();
    const hours = now.getHours();
    let greetingStr = "Welcome, Scholar!";

    if (hours >= 5 && hours < 12) {
        greetingStr = "🌅 Good morning, Scholar!";
    } else if (hours >= 12 && hours < 17) {
        greetingStr = "☀️ Good afternoon, Scholar!";
    } else if (hours >= 17 && hours < 21) {
        greetingStr = "🌆 Good evening, Scholar!";
    } else {
        greetingStr = "🌙 Burning the midnight oil, Scholar?";
    }

    greetingEl.innerText = greetingStr;

    // Formatting date: e.g. "Tuesday, May 26, 2026 - 12:15 PM"
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    const timeString = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    dateEl.innerText = `${dateString} | ${timeString}`;
}

/* --- Weather Simulated Widget --- */
function updateWeatherWidget() {
    const citySelect = document.getElementById("weather-city-select");
    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-description");
    const iconContainer = document.getElementById("weather-icon-container");

    if (!citySelect || !tempEl || !descEl || !iconContainer) return;

    const updateUI = (cityName) => {
        const cityData = WEATHER_DATA[cityName] || WEATHER_DATA["Bangalore"];
        tempEl.innerText = cityData.temp;
        descEl.innerText = cityData.desc;
        
        const svgIcon = WEATHER_ICONS[cityData.icon] || WEATHER_ICONS["cloudy"];
        iconContainer.innerHTML = svgIcon;
    };

    // Trigger on change
    citySelect.addEventListener("change", (e) => {
        updateUI(e.target.value);
        showToast(`Weather set to ${e.target.value}`, "info");
    });

    // Run initial load
    updateUI(citySelect.value);
}

/* --- Bookmarks System --- */
function initBookmarks() {
    try {
        const loaded = localStorage.getItem("edupulse-bookmarks");
        if (loaded) {
            savedArticles = JSON.parse(loaded);
        }
    } catch (e) {
        console.error("Error reading bookmarks", e);
        savedArticles = [];
    }
    renderBookmarksList();
}

function saveBookmarksToStorage() {
    localStorage.setItem("edupulse-bookmarks", JSON.stringify(savedArticles));
    renderBookmarksList();
}

function toggleBookmark(article) {
    if (!article) return;
    
    const index = savedArticles.findIndex(item => item.id === article.id);
    if (index === -1) {
        // Add to bookmarks
        savedArticles.push(article);
        showToast("Article saved to bookmarks", "success");
    } else {
        // Remove from bookmarks
        savedArticles.splice(index, 1);
        showToast("Article removed from bookmarks", "info");
    }
    
    saveBookmarksToStorage();
    
    // Update reader modal bookmark button text if open
    updateModalBookmarkButtonState();
}

function removeBookmarkById(id) {
    savedArticles = savedArticles.filter(item => item.id !== id);
    showToast("Bookmark removed", "info");
    saveBookmarksToStorage();
    
    if (currentArticleInReader && currentArticleInReader.id === id) {
        updateModalBookmarkButtonState();
    }
}

function renderBookmarksList() {
    const listContainer = document.getElementById("saved-articles-list");
    const emptyMsg = document.getElementById("empty-saved-message");
    if (!listContainer) return;

    listContainer.innerHTML = ""; // Clear list

    if (savedArticles.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove("hidden");
        listContainer.appendChild(emptyMsg || document.createElement('div'));
        return;
    }

    if (emptyMsg) emptyMsg.classList.add("hidden");

    savedArticles.forEach(article => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "saved-item";
        
        const titleAnchor = document.createElement("a");
        titleAnchor.className = "saved-item-title";
        titleAnchor.innerText = article.title;
        titleAnchor.addEventListener("click", () => {
            openReaderModal(article);
        });

        const removeBtn = document.createElement("button");
        removeBtn.className = "saved-remove-btn";
        removeBtn.innerHTML = "&times;";
        removeBtn.title = "Remove bookmark";
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            removeBookmarkById(article.id);
        });

        itemDiv.appendChild(titleAnchor);
        itemDiv.appendChild(removeBtn);
        listContainer.appendChild(itemDiv);
    });
}

function updateModalBookmarkButtonState() {
    const bookmarkBtn = document.getElementById("btn-modal-bookmark");
    if (!bookmarkBtn || !currentArticleInReader) return;

    const isSaved = savedArticles.some(item => item.id === currentArticleInReader.id);
    if (isSaved) {
        bookmarkBtn.innerText = "🔖 Bookmarked";
        bookmarkBtn.classList.add("active-state");
    } else {
        bookmarkBtn.innerText = "🔖 Bookmark";
        bookmarkBtn.classList.remove("active-state");
    }
}

/* --- Fetch live news / backup merging --- */
async function fetchNewsData() {
    let apiError = false;
    let errorMessage = "";
    
    // We attempt fetching live articles from general & technology endpoints
    let liveWorldArticles = [];
    let liveTechArticles = [];

    // 1. Fetch live World News
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${API_KEY}`);
        const data = await response.json();
        
        if (data && data.status === 'ok' && Array.isArray(data.articles)) {
            // Assign unique ID and categories
            liveWorldArticles = data.articles.slice(0, 4).map((a, i) => ({
                id: `api-world-${i}`,
                title: a.title,
                description: a.description || "No preview description available. Click to read the full story.",
                content: a.content || a.description || "The publisher has not provided the full content details for this headline. Open the original link in a new tab.",
                url: a.url,
                urlToImage: a.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600",
                publishedAt: a.publishedAt || new Date().toISOString(),
                category: "world",
                source: a.source ? a.source.name : "News Outlet"
            }));
        } else {
            apiError = true;
            errorMessage = data.message || "Failed to load live articles.";
        }
    } catch (error) {
        apiError = true;
        errorMessage = error.message;
    }

    // 2. Fetch live Tech News
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${API_KEY}`);
        const data = await response.json();
        
        if (data && data.status === 'ok' && Array.isArray(data.articles)) {
            liveTechArticles = data.articles.slice(0, 4).map((a, i) => ({
                id: `api-tech-${i}`,
                title: a.title,
                description: a.description || "No preview description available. Click to read the full story.",
                content: a.content || a.description || "The publisher has not provided the full content details for this headline. Open the original link in a new tab.",
                url: a.url,
                urlToImage: a.urlToImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
                publishedAt: a.publishedAt || new Date().toISOString(),
                category: "tech",
                source: a.source ? a.source.name : "Tech Review"
            }));
        } else {
            apiError = true;
            errorMessage = data.message || "Failed to load live technology news.";
        }
    } catch (error) {
        apiError = true;
        errorMessage = error.message;
    }

    // Merge live articles with fallback database
    if (liveWorldArticles.length > 0 || liveTechArticles.length > 0) {
        // Create integrated database: live articles take front priority, backed by science/education fallbacks
        const nonLiveFallbacks = FALLBACK_ARTICLES.filter(art => art.category === 'science' || art.category === 'edu');
        currentArticles = [...liveWorldArticles, ...liveTechArticles, ...nonLiveFallbacks];
        showToast("Connected to live NewsAPI data stream", "success");
    } else {
        // Revert strictly to offline high-fidelity fallbacks
        currentArticles = [...FALLBACK_ARTICLES];
        if (apiError) {
            showOfflineNotice(errorMessage);
        }
    }

    // Trigger initial render of article layout grid
    renderFilteredGrid();
}

// Show warning banner if using fallbacks
function showOfflineNotice(msg) {
    const isFileProtocol = window.location.protocol === 'file:';
    let displayMsg = "Showing offline/local student news. ";
    
    if (isFileProtocol) {
        displayMsg += "NewsAPI.org blocks direct client calls from local files (file://). Launch via local server to fetch live feeds.";
    } else if (msg.includes("Developer plan")) {
        displayMsg += "NewsAPI Developer plan queries must execute on localhost or proxies.";
    } else {
        displayMsg += `Notice: ${msg}`;
    }

    const mainArea = document.querySelector('.news-main');
    if (mainArea) {
        const existing = document.getElementById('offline-notice-banner');
        if (existing) existing.remove();

        const banner = document.createElement('div');
        banner.id = 'offline-notice-banner';
        banner.style.background = 'var(--bg-accent-trans)';
        banner.style.border = '1px solid var(--border-color)';
        banner.style.borderRadius = '12px';
        banner.style.padding = '12px 18px';
        banner.style.color = 'var(--text-secondary)';
        banner.style.fontSize = '0.85rem';
        banner.style.display = 'flex';
        banner.style.alignItems = 'center';
        banner.style.gap = '10px';
        banner.style.marginBottom = '15px';
        
        banner.innerHTML = `
            <span style="font-size: 1.2rem; filter: hue-rotate(180deg);">💡</span>
            <div>
                <strong>Local News active:</strong> ${displayMsg}
            </div>
        `;
        
        mainArea.insertBefore(banner, mainArea.firstChild);
    }
}

/* --- Render Grid Controller --- */
function renderFilteredGrid() {
    const worldContainer = document.getElementById("world-news-container");
    const techContainer = document.getElementById("tech-news-container");

    if (!worldContainer || !techContainer) return;

    // Filter by search query AND active category tab
    const getFiltered = (categoryKey) => {
        return currentArticles.filter(art => {
            const matchesCategory = (categoryKey === 'all' || art.category === categoryKey);
            const query = searchQuery.toLowerCase().trim();
            const matchesQuery = !query || 
                art.title.toLowerCase().includes(query) || 
                art.description.toLowerCase().includes(query) || 
                (art.content && art.content.toLowerCase().includes(query)) ||
                art.category.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });
    };

    const matchingWorld = getFiltered('world');
    const matchingTech = getFiltered('tech');
    const matchingScience = getFiltered('science');
    const matchingEdu = getFiltered('edu');

    // Clear contents
    worldContainer.innerHTML = "";
    techContainer.innerHTML = "";

    // Toggle parent headers depending on active filters
    const worldSection = document.getElementById("world");
    const techSection = document.getElementById("tech");

    // Helper to print cards
    const printCards = (articles, container, categoryLabel) => {
        if (articles.length === 0) {
            container.innerHTML = `<p class="no-results-state">No matching articles in ${categoryLabel}.</p>`;
            return;
        }

        articles.forEach((art, index) => {
            // First article is a major card (with image), other are minified text cards
            if (index === 0 && currentCategory === 'all') {
                const card = document.createElement("article");
                card.className = "card major";
                card.innerHTML = `
                    <div class="img-container">
                        <img src="${art.urlToImage}" alt="News banner">
                    </div>
                    <div class="card-content">
                        <span class="tag ${art.category}-tag">${art.category}</span>
                        <h3>${art.title}</h3>
                        <p>${art.description}</p>
                        <div class="card-footer">
                            <span class="date">${new Date(art.publishedAt).toLocaleDateString()} &bull; ${art.source}</span>
                            <button class="card-action-btn">Read More &rarr;</button>
                        </div>
                    </div>
                `;
                card.addEventListener("click", () => openReaderModal(art));
                container.appendChild(card);
            } else {
                const card = document.createElement("article");
                card.className = "card minified";
                card.innerHTML = `
                    <span class="tag ${art.category}-tag">${art.category}</span>
                    <h3>${art.title}</h3>
                    <div class="minified-meta">
                        <span class="date">${new Date(art.publishedAt).toLocaleDateString()} &bull; ${art.source}</span>
                        <button class="card-action-btn" style="padding: 0;">&rarr;</button>
                    </div>
                `;
                card.addEventListener("click", () => openReaderModal(art));
                container.appendChild(card);
            }
        });
    };

    // Render logic based on selected category tab
    if (currentCategory === 'all') {
        worldSection.style.display = 'block';
        techSection.style.display = 'block';
        
        // World News section displays world category articles
        printCards(matchingWorld, worldContainer, "World Affairs");
        
        // Tech News section displays tech category articles
        printCards(matchingTech, techContainer, "Technology");
    } else {
        // If a specific tab is chosen, we display that category in the corresponding panel and hide the other
        if (currentCategory === 'world') {
            worldSection.style.display = 'block';
            techSection.style.display = 'none';
            printCards(matchingWorld, worldContainer, "World Affairs");
        } else if (currentCategory === 'tech') {
            worldSection.style.display = 'none';
            techSection.style.display = 'block';
            printCards(matchingTech, techContainer, "Technology");
        } else if (currentCategory === 'science') {
            worldSection.style.display = 'block';
            techSection.style.display = 'none';
            // Repurpose world container to show Science articles
            worldSection.querySelector(".section-header h2").innerText = "Science Discovery Hub";
            printCards(matchingScience, worldContainer, "Science");
        } else if (currentCategory === 'edu') {
            worldSection.style.display = 'none';
            techSection.style.display = 'block';
            // Repurpose tech container to show Education articles
            techSection.querySelector(".section-header h2").innerText = "Student Education & Grants";
            printCards(matchingEdu, techContainer, "Education");
        }
    }

    // Restore section titles if reset to all
    if (currentCategory === 'all') {
        worldSection.querySelector(".section-header h2").innerText = "Language & Global Affairs";
        techSection.querySelector(".section-header h2").innerText = "Technology & Innovations";
    }
}

/* --- Search and Filtering interaction bindings --- */
function setupInteractionListeners() {
    const searchInput = document.getElementById("search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const filterContainer = document.getElementById("category-filters-container");
    
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            if (searchQuery.trim().length > 0) {
                clearSearchBtn.classList.remove("hidden");
            } else {
                clearSearchBtn.classList.add("hidden");
            }
            renderFilteredGrid();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            searchQuery = "";
            clearSearchBtn.classList.add("hidden");
            renderFilteredGrid();
        });
    }

    if (filterContainer) {
        filterContainer.addEventListener("click", (e) => {
            const tab = e.target.closest(".filter-tab");
            if (!tab) return;

            document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            currentCategory = tab.dataset.category;
            renderFilteredGrid();
            showToast(`Filtering by ${tab.innerText}`, "info");
        });
    }

    // Accordion sidebar widgets
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains("open");
            
            // Close all items
            document.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("open"));
            
            if (!isOpen) {
                item.classList.add("open");
            }
        });
    });
    // Open first accordion item initially
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].parentElement.classList.add("open");
    }

    // Newsletter subscription action
    const btnSubscribe = document.getElementById("btn-newsletter-subscribe");
    const subEmailInput = document.getElementById("subscriber-email");
    const formContainer = document.getElementById("newsletter-form-container");
    const successMsg = document.getElementById("newsletter-success-msg");

    if (btnSubscribe && subEmailInput) {
        btnSubscribe.addEventListener("click", () => {
            const email = subEmailInput.value.trim();
            if (!email) {
                showToast("Please enter your email", "warning");
                return;
            }
            // Basic syntax validation
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!pattern.test(email)) {
                showToast("Please enter a valid email format", "warning");
                return;
            }

            // Success state
            formContainer.classList.add("hidden");
            successMsg.classList.remove("hidden");
            showToast("Newsletter subscription successful!", "success");

            // Simple micro canvas-confetti simulator
            triggerVisualConfetti();
        });
    }

    // News Reader Modal window bindings
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalOverlay = document.getElementById("news-reader-modal");

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeReaderModal);
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeReaderModal();
        });
    }

    // Reader controls binding
    const ttsListenBtn = document.getElementById("btn-tts-listen");
    const ttsPauseBtn = document.getElementById("btn-tts-pause");
    const ttsStopBtn = document.getElementById("btn-tts-stop");
    const fontDecBtn = document.getElementById("btn-font-decrease");
    const fontIncBtn = document.getElementById("btn-font-increase");
    const bookmarkModalBtn = document.getElementById("btn-modal-bookmark");
    const shareModalBtn = document.getElementById("btn-modal-share");

    if (ttsListenBtn) ttsListenBtn.addEventListener("click", speakArticleText);
    if (ttsPauseBtn) ttsPauseBtn.addEventListener("click", pauseSpeechReader);
    if (ttsStopBtn) ttsStopBtn.addEventListener("click", stopSpeechReader);
    if (fontDecBtn) fontDecBtn.addEventListener("click", () => changeArticleTextScale(-0.1));
    if (fontIncBtn) fontIncBtn.addEventListener("click", () => changeArticleTextScale(0.1));
    if (bookmarkModalBtn) {
        bookmarkModalBtn.addEventListener("click", () => {
            toggleBookmark(currentArticleInReader);
        });
    }
    if (shareModalBtn) shareModalBtn.addEventListener("click", copyArticleShareLink);

    // Escape key closes modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
            closeReaderModal();
        }
    });
}

/* --- News Reader Modal Controller --- */
function openReaderModal(article) {
    if (!article) return;
    
    currentArticleInReader = article;
    stopSpeechReader(); // reset any ongoing readings

    const modal = document.getElementById("news-reader-modal");
    const tag = document.getElementById("modal-tag");
    const title = document.getElementById("modal-title");
    const source = document.getElementById("modal-source");
    const date = document.getElementById("modal-date");
    const img = document.getElementById("modal-image");
    const imageWrapper = document.getElementById("modal-image-wrapper");
    const textBody = document.getElementById("modal-content-text");

    // Set content tags & text
    tag.innerText = article.category;
    tag.className = `modal-article-tag ${article.category}-tag`;
    title.innerText = article.title;
    source.innerText = article.source || "EduPulse News";
    date.innerText = new Date(article.publishedAt).toLocaleDateString();

    if (article.urlToImage) {
        img.src = article.urlToImage;
        imageWrapper.style.display = "block";
    } else {
        imageWrapper.style.display = "none";
    }

    // Set article description + full content body
    const bodyContent = article.content || article.description || "No full content details are available. Click original link to read updates.";
    textBody.innerText = bodyContent;

    // Reset font scaling
    currentFontSizeMultiplier = 1.0;
    textBody.style.fontSize = "1rem";

    // Setup Bookmark button text indicator
    updateModalBookmarkButtonState();

    // Show overlay modal
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // lock body scroll
}

function closeReaderModal() {
    const modal = document.getElementById("news-reader-modal");
    if (!modal) return;

    modal.classList.add("hidden");
    document.body.style.overflow = ""; // restore body scroll
    
    stopSpeechReader(); // stop TTS engine immediately
    currentArticleInReader = null;
}

/* --- Reader Modal Features: Font adjustments, Share, Text-to-Speech --- */
function changeArticleTextScale(delta) {
    const textBody = document.getElementById("modal-content-text");
    if (!textBody) return;

    currentFontSizeMultiplier = Math.max(0.7, Math.min(1.6, currentFontSizeMultiplier + delta));
    textBody.style.fontSize = `${currentFontSizeMultiplier}rem`;
    showToast(`Font size set to ${Math.round(currentFontSizeMultiplier * 100)}%`, "info");
}

function copyArticleShareLink() {
    if (!currentArticleInReader) return;

    const mockShareLink = currentArticleInReader.url && currentArticleInReader.url !== "#" ? 
        currentArticleInReader.url : `https://edupulse.news/article/${currentArticleInReader.id}`;

    // Navigator clipboard copy
    navigator.clipboard.writeText(mockShareLink)
        .then(() => {
            showToast("Shareable link copied to clipboard!", "success");
        })
        .catch(() => {
            showToast("Failed to copy link.", "warning");
        });
}

// SpeechSynthesis API (Text-to-Speech Reader)
function speakArticleText() {
    const textBody = document.getElementById("modal-content-text");
    const ttsListenBtn = document.getElementById("btn-tts-listen");
    const ttsPauseBtn = document.getElementById("btn-tts-pause");
    const ttsStopBtn = document.getElementById("btn-tts-stop");

    if (!textBody || !window.speechSynthesis) {
        showToast("Audio Reader not supported in this browser.", "warning");
        return;
    }

    // If already speaking and paused, resume it
    if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        isSpeechPlaying = true;
        
        ttsListenBtn.classList.add("hidden");
        ttsPauseBtn.classList.remove("hidden");
        ttsStopBtn.classList.remove("hidden");
        showToast("Resuming audio reading", "info");
        return;
    }

    // Cancel anything currently playing first
    window.speechSynthesis.cancel();

    // Compile text content to speak (Headline + Body content)
    const titleText = document.getElementById("modal-title").innerText;
    const bodyContent = textBody.innerText;
    const textToSpeak = `${titleText}. From ${currentArticleInReader.source || 'EduPulse'}. ${bodyContent}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95; // slightly slower for better student comprehension
    
    utterance.onend = () => {
        resetSpeechButtonUI();
    };

    utterance.onerror = (e) => {
        console.error("SpeechSynthesis error:", e);
        resetSpeechButtonUI();
    };

    currentSpeech = utterance;
    window.speechSynthesis.speak(utterance);
    isSpeechPlaying = true;

    ttsListenBtn.classList.add("hidden");
    ttsPauseBtn.classList.remove("hidden");
    ttsStopBtn.classList.remove("hidden");
    showToast("Starting audio reader...", "info");
}

function pauseSpeechReader() {
    const ttsListenBtn = document.getElementById("btn-tts-listen");
    const ttsPauseBtn = document.getElementById("btn-tts-pause");

    if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        isSpeechPlaying = false;

        ttsPauseBtn.classList.add("hidden");
        ttsListenBtn.classList.remove("hidden");
        showToast("Audio reader paused", "info");
    }
}

function stopSpeechReader() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        resetSpeechButtonUI();
    }
}

function resetSpeechButtonUI() {
    const ttsListenBtn = document.getElementById("btn-tts-listen");
    const ttsPauseBtn = document.getElementById("btn-tts-pause");
    const ttsStopBtn = document.getElementById("btn-tts-stop");

    if (!ttsListenBtn) return;

    isSpeechPlaying = false;
    currentSpeech = null;

    ttsListenBtn.classList.remove("hidden");
    ttsPauseBtn.classList.add("hidden");
    ttsStopBtn.classList.add("hidden");
}

/* --- Custom Toast Notifications --- */
function showToast(message, type = 'info') {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    // Choose icons
    let typeIcon = "ℹ️";
    if (type === "success") {
        typeIcon = "✨";
        toast.style.borderLeftColor = "#22c55e";
    } else if (type === "warning") {
        typeIcon = "⚠️";
        toast.style.borderLeftColor = "#ef4444";
    }

    toast.innerHTML = `
        <span style="font-size:1.1rem;">${typeIcon}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto-remove toast
    setTimeout(() => {
        toast.classList.add("toast-remove");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 3000);
}

/* --- Interactive Confetti Animation Simulator --- */
function triggerVisualConfetti() {
    const count = 30;
    const colors = ["#6366f1", "#4f46e5", "#38bdf8", "#4ade80", "#fde047"];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = `${Math.random() * 8 + 6}px`;
        confetti.style.height = `${Math.random() * 12 + 6}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `-20px`;
        confetti.style.borderRadius = "2px";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";
        
        // Random falling properties
        const duration = Math.random() * 2 + 1.5;
        const drift = Math.random() * 100 - 50;
        
        confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(105vh) translateX(${drift}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
            fill: "forwards"
        });

        document.body.appendChild(confetti);
        
        // Remove from DOM
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}