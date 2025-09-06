// Configuration for API endpoints
const BASE_URL = (() => {
    const hostname = window.location.hostname;
    
    // Local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }
    
    // Production - Replace with your actual backend URL on Render
    return 'https://your-backend-app-name.onrender.com';
})();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BASE_URL };
}
