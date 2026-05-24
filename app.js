// Example using a generic News API endpoint
const API_KEY = '0f9c035fc81b464585ec7b1d609f8175';

// High-quality local/fallback articles to display if the API is restricted, rate-limited, or unavailable.
const FALLBACK_WORLD_NEWS = [
    {
        title: "Global Climate Summit Announces New Student Research Grants for 2026",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600",
        description: "New funding opportunities open up for student-led climate research projects starting this academic year.",
        publishedAt: new Date().toISOString()
    },
    {
        title: "International Exchange Programs Expand to Record Numbers",
        url: "#",
        publishedAt: new Date().toISOString()
    },
    {
        title: "New Bilingual Curriculum Standards Adopted by International Schools",
        url: "#",
        publishedAt: new Date().toISOString()
    }
];

const FALLBACK_TECH_NEWS = [
    {
        title: "Next-Gen Quantum Processors Enter Commercial Pilot Phase",
        url: "#",
        urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600",
        description: "Silicon valley startups are spinning up cloud access to 200-qubit systems, offering free tiers for verified university researchers.",
        publishedAt: new Date().toISOString()
    },
    {
        title: "Open-Source Large Language Models Achieve Parity with Proprietary Giants",
        url: "#",
        publishedAt: new Date().toISOString()
    },
    {
        title: "Cybersecurity Alert: New Flaw Identified in Edge Route Mesh Networks",
        url: "#",
        publishedAt: new Date().toISOString()
    }
];

async function fetchStudentNews() {
    let worldArticles = [];
    let techArticles = [];
    let apiErrorOccurred = false;
    let errorMessage = "";

    // 1. Fetch live World News
    try {
        const worldResponse = await fetch(`https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${API_KEY}`);
        const worldData = await worldResponse.json();
        
        if (worldData && worldData.status === 'ok' && Array.isArray(worldData.articles)) {
            worldArticles = worldData.articles.slice(0, 3);
        } else {
            apiErrorOccurred = true;
            errorMessage = worldData.message || "Failed to load articles from NewsAPI.";
            console.warn("NewsAPI World request not ok:", worldData);
        }
    } catch (error) {
        apiErrorOccurred = true;
        errorMessage = error.message;
        console.error("Error fetching World news:", error);
    }

    // 2. Fetch live Tech News
    try {
        const techResponse = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${API_KEY}`);
        const techData = await techResponse.json();
        
        if (techData && techData.status === 'ok' && Array.isArray(techData.articles)) {
            techArticles = techData.articles.slice(0, 3);
        } else {
            apiErrorOccurred = true;
            errorMessage = techData.message || "Failed to load articles from NewsAPI.";
            console.warn("NewsAPI Tech request not ok:", techData);
        }
    } catch (error) {
        apiErrorOccurred = true;
        errorMessage = error.message;
        console.error("Error fetching Tech news:", error);
    }

    // Fallback logic
    if (worldArticles.length === 0) {
        worldArticles = FALLBACK_WORLD_NEWS;
    }
    if (techArticles.length === 0) {
        techArticles = FALLBACK_TECH_NEWS;
    }

    // Render News
    renderNews(worldArticles, 'world-news-container', 'world-tag', 'World');
    renderNews(techArticles, 'tech-news-container', 'tech-tag', 'Tech');

    // Notify the user if we had to use fallback news
    if (apiErrorOccurred) {
        showAPINotice(errorMessage);
    }
}

// Shows a friendly, subtle notice at the top of the news container if the live API fails/is blocked
function showAPINotice(msg) {
    // Check if the protocol is file://
    const isFileProtocol = window.location.protocol === 'file:';
    let displayMsg = "Showing offline/local news backup. ";
    
    if (isFileProtocol) {
        displayMsg += "NewsAPI.org blocks requests from browser files (file://). Run with a local server (e.g. VS Code Live Server) to fetch live news.";
    } else if (msg.includes("browser") || msg.includes("Developer plan")) {
        displayMsg += "NewsAPI.org Developer plan restrictions apply on host environments. Run on localhost or set up a proxy.";
    } else {
        displayMsg += `API Notice: ${msg}`;
    }

    console.info("NewsAPI Notice:", displayMsg);

    // Create a beautiful warning banner on the UI
    const container = document.querySelector('.news-grid');
    if (container) {
        // Remove existing notice if any
        const existingNotice = document.getElementById('api-notice-banner');
        if (existingNotice) existingNotice.remove();

        const noticeDiv = document.createElement('div');
        noticeDiv.id = 'api-notice-banner';
        noticeDiv.style.gridColumn = 'span 2';
        noticeDiv.style.background = '#fffbeb';
        noticeDiv.style.border = '1px solid #fef3c7';
        noticeDiv.style.borderRadius = '8px';
        noticeDiv.style.padding = '12px 16px';
        noticeDiv.style.marginBottom = '20px';
        noticeDiv.style.color = '#b45309';
        noticeDiv.style.fontSize = '0.9rem';
        noticeDiv.style.display = 'flex';
        noticeDiv.style.alignItems = 'center';
        noticeDiv.style.gap = '10px';
        noticeDiv.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';

        noticeDiv.innerHTML = `
            <span style="font-size: 1.2rem; line-height: 1;">⚠️</span>
            <div>
                <strong>Offline/Local Backup Active:</strong> ${displayMsg}
            </div>
        `;
        
        container.insertBefore(noticeDiv, container.firstChild);
    }
}

// Function to generate the HTML cards dynamically for today's data
function renderNews(articles, containerId, tagClass, tagText) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; // Clear the "Loading..." text

    articles.forEach((article, index) => {
        // Make the first article a prominent "Major" card, others "Minified"
        if (index === 0) {
            container.innerHTML += `
                <article class="card major">
                    <img src="${article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600'}" alt="News Image">
                    <div class="card-content">
                        <span class="tag ${tagClass}">${tagText}</span>
                        <h3><a href="${article.url}" target="_blank" style="text-decoration:none; color:inherit;">${article.title}</a></h3>
                        <p>${article.description || 'Click to read the full updates on this breaking story.'}</p>
                        <span class="date">${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Today'}</span>
                    </div>
                </article>
            `;
        } else {
            container.innerHTML += `
                <article class="card minified">
                    <h3><a href="${article.url}" target="_blank" style="text-decoration:none; color:inherit;">${article.title}</a></h3>
                    <span class="date">Today</span>
                </article>
            `;
        }
    });
}

// Run the function automatically when the student loads the page
window.onload = fetchStudentNews;