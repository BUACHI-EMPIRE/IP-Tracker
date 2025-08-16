// Global variables
let map;
let currentMarker;
let isDarkMode = false;
let searchHistory = [];
let currentTab = 'tracker';
let quizData = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];

// DOM elements
const elements = {
    ipInput: document.getElementById('ipInput'),
    searchBtn: document.getElementById('searchBtn'),
    myIpBtn: document.getElementById('myIpBtn'),
    darkModeToggle: document.getElementById('darkModeToggle'),
    resultsSection: document.getElementById('resultsSection'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    messageContainer: document.getElementById('messageContainer'),
    historyList: document.getElementById('historyList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    
    // Result fields
    ipAddress: document.getElementById('ipAddress'),
    city: document.getElementById('city'),
    country: document.getElementById('country'),
    isp: document.getElementById('isp'),
    latitude: document.getElementById('latitude'),
    longitude: document.getElementById('longitude'),
    region: document.getElementById('region'),
    timezone: document.getElementById('timezone'),
    asn: document.getElementById('asn'),
    org: document.getElementById('org'),
    postal: document.getElementById('postal'),
    
    // Buttons
    copyIpBtn: document.getElementById('copyIpBtn'),
    exportPdfBtn: document.getElementById('exportPdfBtn'),
    exportCsvBtn: document.getElementById('exportCsvBtn'),
    
    // Tab navigation
    navTabs: document.querySelectorAll('.nav-tab'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Network tools
    calculateSubnetBtn: document.getElementById('calculateSubnet'),
    subnetIp: document.getElementById('subnetIp'),
    subnetMask: document.getElementById('subnetMask'),
    subnetResults: document.getElementById('subnetResults'),
    networkAddr: document.getElementById('networkAddr'),
    firstHost: document.getElementById('firstHost'),
    lastHost: document.getElementById('lastHost'),
    broadcastAddr: document.getElementById('broadcastAddr'),
    totalHosts: document.getElementById('totalHosts'),
    
    // DNS tool
    lookupDnsBtn: document.getElementById('lookupDns'),
    dnsDomain: document.getElementById('dnsDomain'),
    dnsRecordType: document.getElementById('dnsRecordType'),
    dnsResults: document.getElementById('dnsResults'),
    dnsOutput: document.getElementById('dnsOutput'),
    
    // Port scanner
    startPortScanBtn: document.getElementById('startPortScan'),
    portScannerIp: document.getElementById('portScannerIp'),
    portStart: document.getElementById('portStart'),
    portEnd: document.getElementById('portEnd'),
    portScanResults: document.getElementById('portScanResults'),
    portOutput: document.getElementById('portOutput'),
    
    // Speed test
    startSpeedTestBtn: document.getElementById('startSpeedTest'),
    speedTestResults: document.getElementById('speedTestResults'),
    downloadSpeed: document.getElementById('downloadSpeed'),
    uploadSpeed: document.getElementById('uploadSpeed'),
    pingResult: document.getElementById('pingResult'),
    
    // New Network Tools
    visualizeTopologyBtn: document.getElementById('visualizeTopology'),
    topologyRange: document.getElementById('topologyRange'),
    topologyResults: document.getElementById('topologyResults'),
    
    startProtocolCaptureBtn: document.getElementById('startProtocolCapture'),
    protocolInterface: document.getElementById('protocolInterface'),
    protocolResults: document.getElementById('protocolResults'),
    
    // Security tools
    checkThreatBtn: document.getElementById('checkThreat'),
    threatIp: document.getElementById('threatIp'),
    threatResults: document.getElementById('threatResults'),
    threatStatus: document.getElementById('threatStatus'),
    threatDetails: document.getElementById('threatDetails'),
    
    analyzeVpnBtn: document.getElementById('analyzeVpn'),
    vpnIp: document.getElementById('vpnIp'),
    vpnResults: document.getElementById('vpnResults'),
    vpnStatus: document.getElementById('vpnStatus'),
    vpnDetails: document.getElementById('vpnDetails'),
    
    checkPrivacyBtn: document.getElementById('checkPrivacy'),
    privacyResults: document.getElementById('privacyResults'),
    
    // New Security Tools
    checkPasswordBtn: document.getElementById('checkPassword'),
    passwordTest: document.getElementById('passwordTest'),
    passwordResults: document.getElementById('passwordResults'),
    passwordStrength: document.getElementById('passwordStrength'),
    
    startSecurityScanBtn: document.getElementById('startSecurityScan'),
    securityScanTarget: document.getElementById('securityScanTarget'),
    securityScanResults: document.getElementById('securityScanResults'),
    
    // Quiz elements
    startQuizBtn: document.getElementById('startQuiz'),
    quizIntro: document.getElementById('quizIntro'),
    quizContent: document.getElementById('quizContent'),
    quizResults: document.getElementById('quizResults'),
    questionText: document.getElementById('questionText'),
    optionsContainer: document.getElementById('optionsContainer'),
    currentQuestionSpan: document.getElementById('currentQuestion'),
    totalQuestionsSpan: document.getElementById('totalQuestions'),
    progressBar: document.getElementById('progressBar'),
    nextQuestionBtn: document.getElementById('nextQuestion'),
    finishQuizBtn: document.getElementById('finishQuiz'),
    retakeQuizBtn: document.getElementById('retakeQuiz'),
    scoreEmoji: document.getElementById('scoreEmoji'),
    scoreText: document.getElementById('scoreText'),
    scoreDetails: document.getElementById('scoreDetails'),
    questionReview: document.getElementById('questionReview'),
    
    // New Quiz elements
    currentScore: document.getElementById('currentScore'),
    maxScore: document.getElementById('maxScore'),
    correctAnswers: document.getElementById('correctAnswers'),
    incorrectAnswers: document.getElementById('incorrectAnswers'),
    percentageScore: document.getElementById('percentageScore'),
    shareResultsBtn: document.getElementById('shareResults')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSearchHistory();
    setupEventListeners();
    initializeMap();
    initializeQuiz();
    
    // Auto-detect user's IP on page load
    setTimeout(() => {
        getMyIP();
    }, 1000);
});

// Initialize the application
function initializeApp() {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        isDarkMode = true;
        toggleDarkMode();
    } else {
        // Ensure button is in correct light mode state
        elements.darkModeToggle.textContent = '🌙 Dark Mode';
        elements.darkModeToggle.classList.remove('bg-yellow-600');
        elements.darkModeToggle.classList.add('bg-gray-800');
    }
}

// Initialize quiz with comprehensive networking questions
function initializeQuiz() {
    quizData = [
        {
            question: "What does IP stand for?",
            options: ["Internet Protocol", "Internal Processing", "Information Packet", "Internet Provider"],
            correct: 0,
            explanation: "IP stands for Internet Protocol, which is the fundamental protocol that enables communication across the internet."
        },
        {
            question: "Which IP version is most commonly used today?",
            options: ["IPv3", "IPv4", "IPv5", "IPv6"],
            correct: 1,
            explanation: "IPv4 is still the most commonly used version, though IPv6 adoption is growing rapidly."
        },
        {
            question: "What is the purpose of a subnet mask?",
            options: ["To hide IP addresses", "To divide networks into smaller parts", "To encrypt data", "To speed up connections"],
            correct: 1,
            explanation: "A subnet mask divides large networks into smaller, manageable subnetworks."
        },
        {
            question: "Which protocol is connectionless and unreliable?",
            options: ["TCP", "UDP", "HTTP", "HTTPS"],
            correct: 1,
            explanation: "UDP (User Datagram Protocol) is connectionless and doesn't guarantee delivery or order."
        },
        {
            question: "What does DNS stand for?",
            options: ["Domain Name System", "Data Network Service", "Digital Network Security", "Dynamic Name Server"],
            correct: 0,
            explanation: "DNS translates human-readable domain names into IP addresses."
        },
        {
            question: "Which IP address range is private?",
            options: ["192.168.1.1", "8.8.8.8", "172.217.169.46", "1.1.1.1"],
            correct: 0,
            explanation: "192.168.1.1 is in the private IP range 192.168.0.0/16."
        },
        {
            question: "What is the purpose of a firewall?",
            options: ["To speed up internet", "To block unwanted traffic", "To encrypt data", "To store files"],
            correct: 1,
            explanation: "Firewalls monitor and control incoming and outgoing network traffic based on security rules."
        },
        {
            question: "Which port is commonly used for HTTP?",
            options: ["80", "443", "21", "25"],
            correct: 0,
            explanation: "Port 80 is the standard port for HTTP (unencrypted web traffic)."
        },
        {
            question: "What does VPN stand for?",
            options: ["Virtual Private Network", "Very Private Network", "Virtual Public Network", "Verified Private Network"],
            correct: 0,
            explanation: "VPN creates a secure, encrypted connection over public networks."
        },
        {
            question: "What is the maximum value for each octet in an IPv4 address?",
            options: ["128", "255", "256", "512"],
            correct: 1,
            explanation: "Each octet in IPv4 can range from 0 to 255 (8 bits = 2^8 = 256 values)."
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // IP Tracker events
    elements.searchBtn.addEventListener('click', () => {
        const ip = elements.ipInput.value.trim();
        if (ip) {
            searchIP(ip);
        } else {
            showMessage('Please enter an IP address', 'error');
        }
    });

    elements.myIpBtn.addEventListener('click', getMyIP);
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    
    elements.ipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const ip = elements.ipInput.value.trim();
            if (ip) {
                searchIP(ip);
            }
        }
    });

    elements.copyIpBtn.addEventListener('click', copyIPToClipboard);
    elements.exportPdfBtn.addEventListener('click', exportToPDF);
    elements.exportCsvBtn.addEventListener('click', exportToCSV);
    elements.clearHistoryBtn.addEventListener('click', clearSearchHistory);
    
    // Tab navigation
    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // Network tools events
    elements.calculateSubnetBtn.addEventListener('click', calculateSubnet);
    elements.lookupDnsBtn.addEventListener('click', lookupDNS);
    elements.startPortScanBtn.addEventListener('click', startPortScan);
    elements.startSpeedTestBtn.addEventListener('click', startSpeedTest);
    
    // New Network Tools events
    elements.visualizeTopologyBtn.addEventListener('click', visualizeTopology);
    elements.startProtocolCaptureBtn.addEventListener('click', startProtocolCapture);
    
    // Security tools events
    elements.checkThreatBtn.addEventListener('click', checkThreat);
    elements.analyzeVpnBtn.addEventListener('click', analyzeVPN);
    elements.checkPrivacyBtn.addEventListener('click', checkPrivacy);
    
    // New Security Tools events
    elements.checkPasswordBtn.addEventListener('click', checkPassword);
    elements.startSecurityScanBtn.addEventListener('click', startSecurityScan);
    
    // Quiz events
    elements.startQuizBtn.addEventListener('click', startQuiz);
    elements.nextQuestionBtn.addEventListener('click', nextQuestion);
    elements.finishQuizBtn.addEventListener('click', finishQuiz);
    elements.retakeQuizBtn.addEventListener('click', retakeQuiz);
    elements.shareResultsBtn.addEventListener('click', shareResults);
}

// Tab switching functionality
function switchTab(tabName) {
    // Update active tab
    elements.navTabs.forEach(tab => {
        tab.classList.remove('active', 'bg-blue-600', 'text-white');
        tab.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active', 'bg-blue-600', 'text-white');
        activeTab.classList.remove('bg-gray-200', 'text-gray-700');
    }
    
    // Hide all tab contents
    elements.tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(`${tabName}-tab`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    currentTab = tabName;
    
    // Special handling for map tab
    if (tabName === 'tracker' && map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}

// Initialize Leaflet map
function initializeMap() {
    map = L.map('map').setView([0, 0], 2);
    
    // Add dark mode map tiles
    const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    });
    
    const lightTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap contributors',
        maxZoom: 19
    });
    
    // Store tile layers for easy switching
    map.darkTiles = darkTiles;
    map.lightTiles = lightTiles;
    
    // Start with light tiles
    lightTiles.addTo(map);
}

// Toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        // Body background
        document.body.classList.add('bg-gray-900', 'dark-mode');
        document.body.classList.remove('bg-gray-50');
        
        // Dark mode toggle button
        elements.darkModeToggle.textContent = '☀️ Light Mode';
        elements.darkModeToggle.classList.remove('bg-gray-800');
        elements.darkModeToggle.classList.add('bg-yellow-600');
        
        // Switch to dark map tiles
        if (map) {
            map.lightTiles.remove();
            map.darkTiles.addTo(map);
        }
        
        // Handle gradient backgrounds and cards
        document.querySelectorAll('.bg-gradient-to-br').forEach(element => {
            const classes = element.className;
            if (classes.includes('from-blue-50')) {
                element.className = classes.replace('from-blue-50 to-blue-100', 'from-blue-900 to-blue-800');
            } else if (classes.includes('from-green-50')) {
                element.className = classes.replace('from-green-50 to-green-100', 'from-green-900 to-green-800');
            } else if (classes.includes('from-red-50')) {
                element.className = classes.replace('from-red-50 to-red-100', 'from-red-900 to-red-800');
            } else if (classes.includes('from-purple-50')) {
                element.className = classes.replace('from-purple-50 to-purple-100', 'from-purple-900 to-purple-800');
            } else if (classes.includes('from-yellow-50')) {
                element.className = classes.replace('from-yellow-50 to-yellow-100', 'from-yellow-900 to-yellow-800');
            } else if (classes.includes('from-indigo-50')) {
                element.className = classes.replace('from-indigo-50 to-indigo-100', 'from-indigo-900 to-indigo-800');
            } else if (classes.includes('from-orange-50')) {
                element.className = classes.replace('from-orange-50 to-orange-100', 'from-orange-900 to-orange-800');
            } else if (classes.includes('from-gray-50')) {
                element.className = classes.replace('from-gray-50 to-gray-100', 'from-gray-800 to-gray-700');
            }
        });
        
        // Handle white background cards
        document.querySelectorAll('.bg-white').forEach(card => {
            if (!card.closest('.bg-gradient-to-br')) {
                card.classList.remove('bg-white');
                card.classList.add('bg-gray-800');
            }
        });
        
        // Handle text colors
        document.querySelectorAll('.text-gray-700').forEach(text => {
            if (!text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-gray-700');
                text.classList.add('text-gray-200');
            }
        });
        
        document.querySelectorAll('.text-gray-600').forEach(text => {
            if (!text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-gray-600');
                text.classList.add('text-gray-300');
            }
        });
        
        document.querySelectorAll('.text-gray-800').forEach(text => {
            if (!text.closest('.bg-gradient-to-br') && !text.closest('header') && !text.closest('button')) {
                text.classList.remove('text-gray-800');
                text.classList.add('text-white');
            }
        });
        
        // Handle colored text within gradient sections
        document.querySelectorAll('.text-blue-800').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-blue-800');
                text.classList.add('text-blue-200');
            }
        });
        
        document.querySelectorAll('.text-green-800').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-green-800');
                text.classList.add('text-green-200');
            }
        });
        
        document.querySelectorAll('.text-red-800').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-red-800');
                text.classList.add('text-red-200');
            }
        });
        
        document.querySelectorAll('.text-purple-800').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-purple-800');
                text.classList.add('text-purple-200');
            }
        });
        
        document.querySelectorAll('.text-yellow-800').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-yellow-800');
                text.classList.add('text-yellow-200');
            }
        });
        
        document.querySelectorAll('.text-indigo-800').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-indigo-800');
                text.classList.add('text-indigo-200');
            }
        });
        
        document.querySelectorAll('.text-orange-800').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-orange-800');
                text.classList.add('text-orange-200');
            }
        });
        
        // Handle colored text (blue, green, red, purple, etc.)
        document.querySelectorAll('.text-blue-700').forEach(text => {
            text.classList.remove('text-blue-700');
            text.classList.add('text-blue-300');
        });
        
        document.querySelectorAll('.text-green-700').forEach(text => {
            text.classList.remove('text-green-700');
            text.classList.add('text-green-300');
        });
        
        document.querySelectorAll('.text-red-700').forEach(text => {
            text.classList.remove('text-red-700');
            text.classList.add('text-red-300');
        });
        
        document.querySelectorAll('.text-purple-700').forEach(text => {
            text.classList.remove('text-purple-700');
            text.classList.add('text-purple-300');
        });
        
        document.querySelectorAll('.text-yellow-700').forEach(text => {
            text.classList.remove('text-yellow-700');
            text.classList.add('text-yellow-300');
        });
        
        document.querySelectorAll('.text-indigo-700').forEach(text => {
            text.classList.remove('text-indigo-700');
            text.classList.add('text-indigo-300');
        });
        
        document.querySelectorAll('.text-orange-700').forEach(text => {
            text.classList.remove('text-orange-700');
            text.classList.add('text-orange-300');
        });
        
        // Handle border colors
        document.querySelectorAll('.border-blue-200').forEach(border => {
            border.classList.remove('border-blue-200');
            border.classList.add('border-blue-700');
        });
        
        document.querySelectorAll('.border-green-200').forEach(border => {
            border.classList.remove('border-green-200');
            border.classList.add('border-green-700');
        });
        
        document.querySelectorAll('.border-red-200').forEach(border => {
            border.classList.remove('border-red-200');
            border.classList.add('border-red-700');
        });
        
        document.querySelectorAll('.border-purple-200').forEach(border => {
            border.classList.remove('border-purple-200');
            border.classList.add('border-purple-700');
        });
        
        document.querySelectorAll('.border-yellow-200').forEach(border => {
            border.classList.remove('border-yellow-200');
            border.classList.add('border-yellow-700');
        });
        
        document.querySelectorAll('.border-indigo-200').forEach(border => {
            border.classList.remove('border-indigo-200');
            border.classList.add('border-indigo-700');
        });
        
        document.querySelectorAll('.border-orange-200').forEach(border => {
            border.classList.remove('border-orange-200');
            border.classList.add('border-orange-700');
        });
        
        document.querySelectorAll('.border-gray-200').forEach(border => {
            border.classList.remove('border-gray-200');
            border.classList.add('border-gray-600');
        });
        
    } else {
        // Body background
        document.body.classList.remove('bg-gray-900', 'dark-mode');
        document.body.classList.add('bg-gray-50');
        
        // Light mode toggle button
        elements.darkModeToggle.textContent = '🌙 Dark Mode';
        elements.darkModeToggle.classList.remove('bg-yellow-600');
        elements.darkModeToggle.classList.add('bg-gray-800');
        
        // Switch to light map tiles
        if (map) {
            map.darkTiles.remove();
            map.lightTiles.addTo(map);
        }
        
        // Handle gradient backgrounds and cards
        document.querySelectorAll('.bg-gradient-to-br').forEach(element => {
            const classes = element.className;
            if (classes.includes('from-blue-900')) {
                element.className = classes.replace('from-blue-900 to-blue-800', 'from-blue-50 to-blue-100');
            } else if (classes.includes('from-green-900')) {
                element.className = classes.replace('from-green-900 to-green-800', 'from-green-50 to-green-100');
            } else if (classes.includes('from-red-900')) {
                element.className = classes.replace('from-red-900 to-red-800', 'from-red-50 to-red-100');
            } else if (classes.includes('from-purple-900')) {
                element.className = classes.replace('from-purple-900 to-purple-800', 'from-purple-50 to-purple-100');
            } else if (classes.includes('from-yellow-900')) {
                element.className = classes.replace('from-yellow-900 to-yellow-800', 'from-yellow-50 to-yellow-100');
            } else if (classes.includes('from-indigo-900')) {
                element.className = classes.replace('from-indigo-900 to-indigo-800', 'from-indigo-50 to-indigo-100');
            } else if (classes.includes('from-orange-900')) {
                element.className = classes.replace('from-orange-900 to-orange-800', 'from-orange-50 to-orange-100');
            } else if (classes.includes('from-gray-800')) {
                element.className = classes.replace('from-gray-800 to-gray-700', 'from-gray-50 to-gray-100');
            }
        });
        
        // Handle gray background cards
        document.querySelectorAll('.bg-gray-800').forEach(card => {
            if (!card.closest('.bg-gradient-to-br')) {
                card.classList.remove('bg-gray-800');
                card.classList.add('bg-white');
            }
        });
        
        // Handle text colors
        document.querySelectorAll('.text-gray-200').forEach(text => {
            if (!text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-gray-200');
                text.classList.add('text-gray-700');
            }
        });
        
        document.querySelectorAll('.text-gray-300').forEach(text => {
            if (!text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-gray-300');
                text.classList.add('text-gray-600');
            }
        });
        
        document.querySelectorAll('.text-white').forEach(text => {
            if (!text.closest('.bg-gradient-to-br') && !text.closest('header') && !text.closest('button')) {
                text.classList.remove('text-white');
                text.classList.add('text-gray-800');
            }
        });
        
        // Handle colored text within gradient sections
        document.querySelectorAll('.text-blue-200').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-blue-200');
                text.classList.add('text-blue-800');
            }
        });
        
        document.querySelectorAll('.text-green-200').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-green-200');
                text.classList.add('text-green-800');
            }
        });
        
        document.querySelectorAll('.text-red-200').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-red-200');
                text.classList.add('text-red-800');
            }
        });
        
        document.querySelectorAll('.text-purple-200').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-purple-200');
                text.classList.add('text-purple-800');
            }
        });
        
        document.querySelectorAll('.text-yellow-200').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-yellow-200');
                text.classList.add('text-yellow-800');
            }
        });
        
        document.querySelectorAll('.text-indigo-200').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-indigo-200');
                text.classList.add('text-indigo-800');
            }
        });
        
        document.querySelectorAll('.text-orange-200').forEach(text => {
            if (text.closest('.bg-gradient-to-br')) {
                text.classList.remove('text-orange-200');
                text.classList.add('text-orange-800');
            }
        });
        
        // Handle colored text (blue, green, red, purple, etc.)
        document.querySelectorAll('.text-blue-300').forEach(text => {
            text.classList.remove('text-blue-300');
            text.classList.add('text-blue-700');
        });
        
        document.querySelectorAll('.text-green-300').forEach(text => {
            text.classList.remove('text-green-300');
            text.classList.add('text-green-700');
        });
        
        document.querySelectorAll('.text-red-300').forEach(text => {
            text.classList.remove('text-red-300');
            text.classList.add('text-red-700');
        });
        
        document.querySelectorAll('.text-purple-300').forEach(text => {
            text.classList.remove('text-purple-300');
            text.classList.add('text-purple-700');
        });
        
        document.querySelectorAll('.text-yellow-300').forEach(text => {
            text.classList.remove('text-yellow-300');
            text.classList.add('text-yellow-700');
        });
        
        document.querySelectorAll('.text-indigo-300').forEach(text => {
            text.classList.remove('text-indigo-300');
            text.classList.add('text-indigo-700');
        });
        
        document.querySelectorAll('.text-orange-300').forEach(text => {
            text.classList.remove('text-orange-300');
            text.classList.add('text-orange-700');
        });
        
        // Handle border colors
        document.querySelectorAll('.border-blue-700').forEach(border => {
            border.classList.remove('border-blue-700');
            border.classList.add('border-blue-200');
        });
        
        document.querySelectorAll('.border-green-700').forEach(border => {
            border.classList.remove('border-green-700');
            border.classList.add('border-green-200');
        });
        
        document.querySelectorAll('.border-red-700').forEach(border => {
            border.classList.remove('border-red-700');
            border.classList.add('border-red-200');
        });
        
        document.querySelectorAll('.border-purple-700').forEach(border => {
            border.classList.remove('border-purple-700');
            border.classList.add('border-purple-200');
        });
        
        document.querySelectorAll('.border-yellow-700').forEach(border => {
            border.classList.remove('border-yellow-700');
            border.classList.add('border-yellow-200');
        });
        
        document.querySelectorAll('.border-indigo-700').forEach(border => {
            border.classList.remove('border-indigo-700');
            border.classList.add('border-indigo-200');
        });
        
        document.querySelectorAll('.border-orange-700').forEach(border => {
            border.classList.remove('border-orange-700');
            border.classList.add('border-orange-200');
        });
        
        document.querySelectorAll('.border-gray-600').forEach(border => {
            border.classList.remove('border-gray-600');
            border.classList.add('border-gray-200');
        });
    }
    
    localStorage.setItem('darkMode', isDarkMode);
}

// Get user's own IP address
async function getMyIP() {
    try {
        showLoading(true);
        
        // Try multiple IP detection APIs as fallback
        const ipApis = [
            'https://api.ipify.org?format=json',
            'https://api64.ipify.org?format=json',
            'https://api.myip.com',
            'https://ipinfo.io/json'
        ];
        
        let ip = null;
        let error = null;
        
        for (const apiUrl of ipApis) {
            try {
                const response = await fetch(apiUrl, { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    timeout: 5000
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const data = await response.json();
                
                // Handle different API response formats
                if (data.ip) {
                    ip = data.ip;
                    break;
                } else if (data.query) {
                    ip = data.query;
                    break;
                }
            } catch (apiError) {
                console.warn(`Failed to fetch from ${apiUrl}:`, apiError);
                error = apiError;
                continue;
            }
        }
        
        if (ip) {
            elements.ipInput.value = ip;
            await searchIP(ip);
        } else {
            throw error || new Error('All IP detection APIs failed');
        }
        
    } catch (error) {
        console.error('Error fetching IP:', error);
        showMessage('Failed to get your IP address. Please try again or enter an IP manually.', 'error');
        
        // Show helpful suggestions
        setTimeout(() => {
            showMessage('💡 Try entering a public IP like 8.8.8.8 or 1.1.1.1', 'info');
        }, 2000);
    } finally {
        showLoading(false);
    }
}

// Search for IP address with multiple API fallbacks
async function searchIP(ip) {
    try {
        showLoading(true);
        
        // Validate IP format
        const ipValidation = isValidIP(ip);
        if (ipValidation === false) {
            showMessage('Please enter a valid IP address', 'error');
            return;
        }
        
        if (ipValidation === 'private') {
            showPrivateIPInfo(ip);
            return;
        }
        
        // Try multiple geolocation APIs as fallback
        const geoApis = [
            {
                url: `https://ipapi.co/${ip}/json/`,
                name: 'ipapi.co',
                transform: (data) => data
            },
            {
                url: `https://ipinfo.io/${ip}/json`,
                name: 'ipinfo.io',
                transform: (data) => ({
                    ip: data.ip,
                    city: data.city,
                    region: data.region,
                    country: data.country,
                    country_name: data.country,
                    latitude: data.loc?.split(',')[0],
                    longitude: data.loc?.split(',')[1],
                    timezone: data.timezone,
                    org: data.org,
                    postal: data.postal,
                    asn: data.org?.split(' ')[0] || 'N/A'
                })
            },
            {
                url: `https://api.ipgeolocation.io/ipgeo?apiKey=free&ip=${ip}`,
                name: 'ipgeolocation.io',
                transform: (data) => ({
                    ip: data.ip,
                    city: data.city,
                    region: data.state_prov,
                    country: data.country_code2,
                    country_name: data.country_name,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    timezone: data.time_zone?.name,
                    org: data.organization,
                    postal: data.zipcode,
                    asn: data.asn || 'N/A'
                })
            }
        ];
        
        let data = null;
        let error = null;
        
        for (const api of geoApis) {
            try {
                const response = await fetch(api.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    timeout: 8000
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const rawData = await response.json();
                
                if (rawData.error) {
                    throw new Error(rawData.error);
                }
                
                data = api.transform(rawData);
                
                // Validate that we got essential data
                if (data.city && data.country_name) {
                    console.log(`Successfully fetched data from ${api.name}`);
                    break;
                } else {
                    throw new Error('Incomplete data received');
                }
                
            } catch (apiError) {
                console.warn(`Failed to fetch from ${api.name}:`, apiError);
                error = apiError;
                continue;
            }
        }
        
        if (data) {
            // Display results
            displayResults(data);
            
            // Update map if coordinates are available
            if (data.latitude && data.longitude) {
                updateMap(data.latitude, data.longitude, data.city, data.country_name);
            } else {
                // Hide map if no coordinates
                const mapSection = document.querySelector('#map').closest('.bg-white.rounded-lg.shadow-lg.p-6');
                if (mapSection) {
                    mapSection.classList.add('hidden');
                }
            }
            
            // Add to search history
            addToSearchHistory(ip, data);
            
            showMessage('Location data retrieved successfully!', 'success');
        } else {
            throw error || new Error('All geolocation APIs failed');
        }
        
    } catch (error) {
        console.error('Error searching IP:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to fetch location data';
        
        if (error.message.includes('429')) {
            errorMessage = 'API rate limit exceeded. Please try again later.';
        } else if (error.message.includes('404')) {
            errorMessage = 'IP address not found in our database.';
        } else if (error.message.includes('timeout')) {
            errorMessage = 'Request timed out. Please check your internet connection.';
        } else if (error.message.includes('CORS')) {
            errorMessage = 'Network error. Please try again.';
        }
        
        showMessage(errorMessage, 'error');
        
        // Show helpful suggestions
        setTimeout(() => {
            showMessage('💡 Try a different IP address or check your internet connection', 'info');
        }, 2000);
        
        // Offer demo mode after a delay
        setTimeout(() => {
            if (confirm('Would you like to see a demo with sample data?')) {
                showDemoData();
            }
        }, 4000);
    } finally {
        showLoading(false);
    }
}

// Show demo data when APIs fail
function showDemoData() {
    const demoData = {
        ip: '8.8.8.8',
        city: 'Mountain View',
        region: 'California',
        country: 'US',
        country_name: 'United States',
        latitude: '37.4056',
        longitude: '-122.0775',
        timezone: 'America/Los_Angeles',
        org: 'Google LLC',
        postal: '94043',
        asn: 'AS15169'
    };
    
    // Set the IP in the input
    elements.ipInput.value = demoData.ip;
    
    // Display the demo data
    displayResults(demoData);
    
    // Update map
    updateMap(demoData.latitude, demoData.longitude, demoData.city, demoData.country_name);
    
    // Add to search history
    addToSearchHistory(demoData.ip, demoData);
    
    // Show demo message
    showMessage('🎭 Demo mode: Showing sample data for Google DNS (8.8.8.8)', 'info');
    
    // Add demo indicator
    const demoIndicator = document.createElement('div');
    demoIndicator.className = 'bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4';
    demoIndicator.innerHTML = `
        <div class="flex items-center">
            <span class="text-yellow-600 mr-2">🎭</span>
            <span class="font-medium">Demo Mode Active</span>
            <span class="ml-2 text-sm">This is sample data. Real data requires working APIs.</span>
        </div>
    `;
    
    // Insert demo indicator at the top of results
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection && !resultsSection.querySelector('.bg-yellow-100')) {
        resultsSection.insertBefore(demoIndicator, resultsSection.firstChild);
    }
}

// Display information about private IP addresses
function showPrivateIPInfo(ip) {
    const parts = ip.split('.').map(Number);
    let ipType = '';
    let description = '';
    let networkRange = '';
    
    if (parts[0] === 10) {
        ipType = 'Class A Private Network';
        description = 'Large private networks (corporations, universities)';
        networkRange = '10.0.0.0/8';
    } else if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) {
        ipType = 'Class B Private Network';
        description = 'Medium private networks (medium businesses)';
        networkRange = '172.16.0.0/12';
    } else if (parts[0] === 192 && parts[1] === 168) {
        ipType = 'Class C Private Network';
        description = 'Small private networks (home networks, small offices)';
        networkRange = '192.168.0.0/16';
    } else if (parts[0] === 127) {
        ipType = 'Localhost/Loopback';
        description = 'Your own computer (127.0.0.1)';
        networkRange = '127.0.0.0/8';
    } else if (parts[0] === 169 && parts[1] === 254) {
        ipType = 'Link-Local Address';
        description = 'Automatically assigned when DHCP fails';
        networkRange = '169.254.0.0/16';
    }
    
    // Display results
    elements.resultsSection.classList.remove('hidden');
    
    // Update main info cards
    elements.ipAddress.textContent = ip;
    elements.city.textContent = 'Private Network';
    elements.country.textContent = 'Local/Internal';
    elements.isp.textContent = 'Internal Network';
    
    // Update location details
    elements.latitude.textContent = 'N/A (Private)';
    elements.latitude.textContent = 'N/A (Private)';
    elements.longitude.textContent = 'N/A (Private)';
    elements.region.textContent = 'N/A (Private)';
    elements.timezone.textContent = 'N/A (Private)';
    
    // Update network info
    elements.asn.textContent = 'N/A (Private)';
    elements.org.textContent = 'N/A (Private)';
    elements.postal.textContent = 'N/A (Private)';
    
    // Add educational information
    const privateInfo = document.createElement('div');
    privateInfo.className = 'bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6';
    privateInfo.innerHTML = `
        <h3 class="text-lg font-semibold text-blue-800 mb-3">🔒 Private IP Address Detected</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 class="font-medium text-blue-700 mb-2">IP Address Type:</h4>
                <p class="text-blue-600">${ipType}</p>
                <p class="text-sm text-blue-500 mt-1">${description}</p>
            </div>
            <div>
                <h4 class="font-medium text-blue-700 mb-2">Network Range:</h4>
                <p class="font-mono text-blue-600">${networkRange}</p>
                <p class="text-sm text-blue-500 mt-1">This IP is not routable on the internet</p>
            </div>
        </div>
        <div class="mt-4 p-3 bg-blue-100 rounded-lg">
            <h4 class="font-medium text-blue-800 mb-2">💡 Why can't we track this IP?</h4>
            <ul class="text-sm text-blue-700 space-y-1">
                <li>• Private IPs only exist within local networks</li>
                <li>• They are not assigned by internet registries</li>
                <li>• Multiple networks can use the same private IPs</li>
                <li>• They cannot be reached from the public internet</li>
            </ul>
        </div>
        <div class="mt-4 p-3 bg-yellow-100 rounded-lg">
            <h4 class="font-medium text-yellow-800 mb-2">🌐 Try these public IPs instead:</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <button onclick="searchIP('8.8.8.8')" class="p-2 bg-yellow-200 hover:bg-yellow-300 rounded transition-colors">
                    Google DNS (8.8.8.8)
                </button>
                <button onclick="searchIP('1.1.1.1')" class="p-2 bg-yellow-200 hover:bg-yellow-300 rounded transition-colors">
                    Cloudflare (1.1.1.1)
                </button>
                <button onclick="searchIP('208.67.222.222')" class="p-2 bg-yellow-200 hover:bg-yellow-300 rounded transition-colors">
                    OpenDNS (208.67.222.222)
                </button>
                <button onclick="searchIP('9.9.9.9')" class="p-2 bg-yellow-200 hover:bg-yellow-300 rounded transition-colors">
                    Quad9 (9.9.9.9)
                </button>
            </div>
        </div>
    `;
    
    // Insert the private IP info before the map section
    const mapSection = elements.resultsSection.querySelector('#map').closest('.bg-white');
    mapSection.parentNode.insertBefore(privateInfo, mapSection);
    
    // Hide the map for private IPs
    mapSection.style.display = 'none';
    
    // Scroll to results
    elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    showMessage(`Private IP address detected: ${ipType}`, 'info');
}

// Validate IP address format and check if it's public
function isValidIP(ip) {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    if (ipv4Regex.test(ip)) {
        const parts = ip.split('.').map(Number);
        
        // Check if each octet is valid (0-255)
        if (!parts.every(part => part >= 0 && part <= 255)) {
            return false;
        }
        
        // Check if it's a private IP address
        if (isPrivateIP(parts)) {
            return 'private';
        }
        
        return true;
    }
    
    return ipv6Regex.test(ip);
}

// Check if IP address is private
function isPrivateIP(parts) {
    // 10.0.0.0/8
    if (parts[0] === 10) return true;
    
    // 172.16.0.0/12
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    
    // 192.168.0.0/16
    if (parts[0] === 192 && parts[1] === 168) return true;
    
    // 127.0.0.0/8 (localhost)
    if (parts[0] === 127) return true;
    
    // 169.254.0.0/16 (link-local)
    if (parts[0] === 169 && parts[1] === 254) return true;
    
    // 224.0.0.0/4 (multicast)
    if (parts[0] >= 224 && parts[0] <= 239) return true;
    
    return false;
}

// Display search results
function displayResults(data) {
    elements.resultsSection.classList.remove('hidden');
    
    // Clear any previous private IP info
    clearPrivateIPInfo();
    
    // Show the map section
    const mapSection = elements.resultsSection.querySelector('#map').closest('.bg-white');
    if (mapSection) {
        mapSection.style.display = 'block';
    }
    
    // Update main info cards
    elements.ipAddress.textContent = data.ip || 'N/A';
    elements.city.textContent = data.city || 'N/A';
    elements.country.textContent = data.country_name || 'N/A';
    elements.isp.textContent = data.org || 'N/A';
    
    // Update location details
    elements.latitude.textContent = data.latitude || 'N/A';
    elements.longitude.textContent = data.longitude || 'N/A';
    elements.region.textContent = data.region || 'N/A';
    elements.timezone.textContent = data.timezone || 'N/A';
    
    // Update network info
    elements.asn.textContent = data.asn || 'N/A';
    elements.org.textContent = data.org || 'N/A';
    elements.postal.textContent = data.postal || 'N/A';
    
    // Scroll to results
    elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Clear private IP information
function clearPrivateIPInfo() {
    const privateInfo = elements.resultsSection.querySelector('.bg-blue-50.border.border-blue-200');
    if (privateInfo) {
        privateInfo.remove();
    }
}

// Update map with new location
function updateMap(lat, lon, city, country) {
    if (!map) return;
    
    // Remove existing marker
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    // Add new marker
    currentMarker = L.marker([lat, lon]).addTo(map);
    
    // Add popup
    currentMarker.bindPopup(`
        <div class="text-center">
            <h3 class="font-bold">${city || 'Unknown City'}</h3>
            <p>${country || 'Unknown Country'}</p>
            <p class="text-sm text-gray-600">${lat}, ${lon}</p>
        </div>
    `);
    
    // Center map on new location
    map.setView([lat, lon], 10);
}

// Copy IP address to clipboard
async function copyIPToClipboard() {
    const ip = elements.ipAddress.textContent;
    if (ip && ip !== 'N/A') {
        try {
            await navigator.clipboard.writeText(ip);
            showMessage('IP address copied to clipboard!', 'success');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = ip;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showMessage('IP address copied to clipboard!', 'success');
        }
    }
}

// Export to PDF
async function exportToPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(20);
        doc.text('IP Address Location Report', 20, 20);
        
        // Add IP info
        doc.setFontSize(12);
        doc.text(`IP Address: ${elements.ipAddress.textContent}`, 20, 40);
        doc.text(`City: ${elements.city.textContent}`, 20, 50);
        doc.text(`Country: ${elements.country.textContent}`, 20, 60);
        doc.text(`ISP: ${elements.isp.textContent}`, 20, 70);
        doc.text(`Latitude: ${elements.latitude.textContent}`, 20, 80);
        doc.text(`Longitude: ${elements.longitude.textContent}`, 20, 90);
        doc.text(`Region: ${elements.region.textContent}`, 20, 100);
        doc.text(`Timezone: ${elements.timezone.textContent}`, 20, 110);
        doc.text(`ASN: ${elements.asn.textContent}`, 20, 120);
        doc.text(`Organization: ${elements.org.textContent}`, 20, 130);
        doc.text(`Postal Code: ${elements.postal.textContent}`, 20, 140);
        
        // Add timestamp
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 160);
        
        // Save PDF
        doc.save(`ip-location-${elements.ipAddress.textContent}.pdf`);
        showMessage('PDF exported successfully!', 'success');
        
    } catch (error) {
        console.error('Error exporting PDF:', error);
        showMessage('Failed to export PDF', 'error');
    }
}

// Export to CSV
function exportToCSV() {
    try {
        const csvContent = [
            ['Field', 'Value'],
            ['IP Address', elements.ipAddress.textContent],
            ['City', elements.city.textContent],
            ['Country', elements.country.textContent],
            ['ISP', elements.isp.textContent],
            ['Latitude', elements.latitude.textContent],
            ['Longitude', elements.longitude.textContent],
            ['Region', elements.region.textContent],
            ['Timezone', elements.timezone.textContent],
            ['ASN', elements.asn.textContent],
            ['Organization', elements.org.textContent],
            ['Postal Code', elements.postal.textContent],
            ['Generated', new Date().toLocaleString()]
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ip-location-${elements.ipAddress.textContent}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        showMessage('CSV exported successfully!', 'success');
        
    } catch (error) {
        console.error('Error exporting CSV:', error);
        showMessage('Failed to export CSV', 'error');
    }
}

// Add to search history
function addToSearchHistory(ip, data) {
    const historyItem = {
        ip: ip,
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown',
        timestamp: new Date().toISOString(),
        data: data
    };
    
    // Remove duplicate if exists
    searchHistory = searchHistory.filter(item => item.ip !== ip);
    
    // Add to beginning
    searchHistory.unshift(historyItem);
    
    // Keep only last 10 searches
    if (searchHistory.length > 10) {
        searchHistory = searchHistory.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
    // Update display
    displaySearchHistory();
}

// Load search history from localStorage
function loadSearchHistory() {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
        searchHistory = JSON.parse(saved);
        displaySearchHistory();
    }
}

// Display search history
function displaySearchHistory() {
    if (searchHistory.length === 0) {
        elements.historyList.innerHTML = '<p class="text-gray-500 text-center py-4">No search history yet</p>';
        return;
    }
    
    elements.historyList.innerHTML = searchHistory.map(item => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex-1">
                <div class="font-mono text-blue-600">${item.ip}</div>
                <div class="text-sm text-gray-600">${item.city}, ${item.country}</div>
                <div class="text-xs text-gray-500">${new Date(item.timestamp).toLocaleString()}</div>
            </div>
            <button 
                onclick="loadHistoryItem('${item.ip}')" 
                class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
                🔍 Reload
            </button>
        </div>
    `).join('');
}

// Load history item
function loadHistoryItem(ip) {
    elements.ipInput.value = ip;
    searchIP(ip);
}

// Clear search history
function clearSearchHistory() {
    if (confirm('Are you sure you want to clear all search history?')) {
        searchHistory = [];
        localStorage.removeItem('searchHistory');
        displaySearchHistory();
        showMessage('Search history cleared', 'success');
    }
}

// Show/hide loading spinner
function showLoading(show) {
    if (show) {
        elements.loadingSpinner.classList.remove('hidden');
    } else {
        elements.loadingSpinner.classList.add('hidden');
    }
}

// Show message
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `px-4 py-3 rounded-lg shadow-lg mb-4 max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    messageDiv.textContent = message;
    
    elements.messageContainer.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Handle API errors gracefully
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showMessage('An unexpected error occurred', 'error');
});

// Quiz functionality
function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    
    elements.quizIntro.classList.add('hidden');
    elements.quizContent.classList.remove('hidden');
    elements.quizResults.classList.add('hidden');
    
    showQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function retakeQuiz() {
    elements.quizResults.classList.add('hidden');
    startQuiz();
}

// Network Tools Functions
function calculateSubnet() {
    const ip = elements.subnetIp.value.trim();
    const mask = parseInt(elements.subnetMask.value);
    
    if (!ip || !mask || mask < 0 || mask > 32) {
        showMessage('Please enter valid IP address and subnet mask (0-32)', 'error');
        return;
    }
    
    try {
        const ipParts = ip.split('.').map(Number);
        const networkAddr = [];
        const broadcastAddr = [];
        
        // Calculate network address
        for (let i = 0; i < 4; i++) {
            const bits = Math.max(0, Math.min(8, mask - i * 8));
            const maskValue = bits === 8 ? 255 : bits === 0 ? 0 : (1 << bits) - 1;
            networkAddr[i] = ipParts[i] & maskValue;
            broadcastAddr[i] = networkAddr[i] | (255 - maskValue);
        }
        
        // Calculate first and last host
        const firstHost = [...networkAddr];
        firstHost[3]++;
        const lastHost = [...broadcastAddr];
        lastHost[3]--;
        
        // Calculate total hosts
        const totalHosts = Math.pow(2, 32 - mask) - 2;
        
        // Display results
        elements.networkAddr.textContent = networkAddr.join('.');
        elements.firstHost.textContent = firstHost.join('.');
        elements.lastHost.textContent = lastHost.join('.');
        elements.broadcastAddr.textContent = broadcastAddr.join('.');
        elements.totalHosts.textContent = totalHosts;
        
        elements.subnetResults.classList.remove('hidden');
        showMessage('Subnet calculation completed!', 'success');
        
    } catch (error) {
        showMessage('Error calculating subnet. Please check your input.', 'error');
    }
}

function lookupDNS() {
    const domain = elements.dnsDomain.value.trim();
    const recordType = elements.dnsRecordType.value;
    
    if (!domain) {
        showMessage('Please enter a domain name', 'error');
        return;
    }
    
    // Simulate DNS lookup (in real app, you'd use a DNS API)
    elements.dnsOutput.innerHTML = `
        <div class="text-green-600">✓ DNS lookup successful</div>
        <div class="mt-2">
            <strong>Domain:</strong> ${domain}<br>
            <strong>Record Type:</strong> ${recordType}<br>
            <strong>TTL:</strong> 300 seconds<br>
            <strong>Results:</strong><br>
            <div class="ml-4 mt-1">
                ${recordType === 'A' ? '192.168.1.1' : 
                  recordType === 'AAAA' ? '2001:db8::1' :
                  recordType === 'MX' ? '10 mail.example.com' :
                  recordType === 'NS' ? 'ns1.example.com' :
                  recordType === 'TXT' ? '"v=spf1 include:_spf.example.com ~all"' :
                  'example.com'}
            </div>
        </div>
    `;
    
    elements.dnsResults.classList.remove('hidden');
    showMessage('DNS lookup completed!', 'success');
}

function startPortScan() {
    const ip = elements.portScannerIp.value.trim();
    const start = parseInt(elements.portStart.value);
    const end = parseInt(elements.portEnd.value);
    
    if (!ip || !start || !end || start < 1 || end > 65535 || start > end) {
        showMessage('Please enter valid IP and port range', 'error');
        return;
    }
    
    elements.portOutput.innerHTML = '';
    elements.portScanResults.classList.remove('hidden');
    
    // Simulate port scanning
    const commonPorts = {
        21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS',
        80: 'HTTP', 110: 'POP3', 143: 'IMAP', 443: 'HTTPS', 993: 'IMAPS'
    };
    
    let completed = 0;
    const total = end - start + 1;
    
    for (let port = start; port <= end; port++) {
        setTimeout(() => {
            const isOpen = Math.random() > 0.8; // 20% chance of being open
            const service = commonPorts[port] || 'Unknown';
            
            const portElement = document.createElement('div');
            portElement.className = `port p-2 rounded text-center text-sm ${isOpen ? 'open' : 'closed'}`;
            portElement.textContent = `Port ${port} (${service}) - ${isOpen ? 'OPEN' : 'CLOSED'}`;
            
            elements.portOutput.appendChild(portElement);
            completed++;
            
            if (completed === total) {
                showMessage('Port scan completed!', 'success');
            }
        }, (port - start) * 100);
    }
}

function startSpeedTest() {
    elements.speedTestResults.classList.remove('hidden');
    elements.downloadSpeed.textContent = 'Testing...';
    elements.uploadSpeed.textContent = 'Testing...';
    elements.pingResult.textContent = 'Testing...';
    
    // Simulate speed test
    setTimeout(() => {
        const download = (Math.random() * 100 + 50).toFixed(1);
        const upload = (Math.random() * 20 + 10).toFixed(1);
        const ping = Math.floor(Math.random() * 50 + 10);
        
        elements.downloadSpeed.textContent = download;
        elements.uploadSpeed.textContent = upload;
        elements.pingResult.textContent = ping;
        
        showMessage('Speed test completed!', 'success');
    }, 3000);
}

// Security Tools Functions
function checkThreat() {
    const ip = elements.threatIp.value.trim();
    
    if (!ip) {
        showMessage('Please enter an IP address to check', 'error');
        return;
    }
    
    // Simulate threat intelligence check
    const isThreat = Math.random() > 0.9; // 10% chance of being flagged
    
    if (isThreat) {
        elements.threatStatus.className = 'p-3 bg-red-100 text-red-800 rounded-lg text-center font-medium';
        elements.threatStatus.textContent = '⚠️ THREAT DETECTED';
        elements.threatDetails.innerHTML = `
            <div class="p-3 bg-red-50 rounded-lg">
                <div class="font-medium text-red-800 mb-2">Threat Details:</div>
                <ul class="text-sm text-red-700 space-y-1">
                    <li>• Malware distribution detected</li>
                    <li>• Multiple abuse reports</li>
                    <li>• Botnet activity suspected</li>
                    <li>• Last seen: ${new Date().toLocaleDateString()}</li>
                </ul>
            </div>
        `;
    } else {
        elements.threatStatus.className = 'p-3 bg-green-100 text-green-800 rounded-lg text-center font-medium';
        elements.threatStatus.textContent = '✅ NO THREATS DETECTED';
        elements.threatDetails.innerHTML = `
            <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-medium text-green-800 mb-2">Security Status:</div>
                <ul class="text-sm text-green-700 space-y-1">
                    <li>• No known threats</li>
                    <li>• Clean reputation</li>
                    <li>• Safe for communication</li>
                </ul>
            </div>
        `;
    }
    
    elements.threatResults.classList.remove('hidden');
    showMessage('Threat check completed!', 'success');
}

function analyzeVPN() {
    const ip = elements.vpnIp.value.trim();
    
    if (!ip) {
        showMessage('Please enter an IP address to analyze', 'error');
        return;
    }
    
    // Simulate VPN detection
    const isVPN = Math.random() > 0.7; // 30% chance of being VPN
    
    if (isVPN) {
        elements.vpnStatus.className = 'p-3 bg-blue-100 text-blue-800 rounded-lg text-center font-medium';
        elements.vpnStatus.textContent = '🕵️ VPN/PROXY DETECTED';
        elements.vpnDetails.innerHTML = `
            <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-medium text-blue-800 mb-2">Detection Results:</div>
                <ul class="text-sm text-blue-700 space-y-1">
                    <li>• IP geolocation mismatch</li>
                    <li>• Known VPN server range</li>
                    <li>• DNS leak detected</li>
                    <li>• Anonymity level: High</li>
                </ul>
            </div>
        `;
    } else {
        elements.vpnStatus.className = 'p-3 bg-green-100 text-green-800 rounded-lg text-center font-medium';
        elements.vpnStatus.textContent = '✅ NO VPN/PROXY DETECTED';
        elements.vpnDetails.innerHTML = `
            <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-medium text-green-800 mb-2">Analysis Results:</div>
                <ul class="text-sm text-green-700 space-y-1">
                    <li>• Direct connection detected</li>
                    <li>• No proxy indicators</li>
                    <li>• Geolocation consistent</li>
                    <li>• Anonymity level: Low</li>
                </ul>
            </div>
        `;
    }
    
    elements.vpnResults.classList.remove('hidden');
    showMessage('VPN analysis completed!', 'success');
}

function checkPrivacy() {
    // Check browser privacy settings
    const privacyChecks = [
        {
            name: 'Do Not Track',
            status: navigator.doNotTrack === '1',
            description: 'Tells websites not to track you'
        },
        {
            name: 'Cookies Enabled',
            status: navigator.cookieEnabled,
            description: 'Cookies are enabled in your browser'
        },
        {
            name: 'JavaScript Enabled',
            status: true, // We're running JS
            description: 'JavaScript is enabled'
        },
        {
            name: 'Local Storage',
            status: typeof(Storage) !== 'undefined',
            description: 'Local storage is available'
        },
        {
            name: 'Session Storage',
            status: typeof(sessionStorage) !== 'undefined',
            description: 'Session storage is available'
        }
    ];
    
    elements.privacyResults.innerHTML = privacyChecks.map(check => `
        <div class="flex items-center justify-between p-2 ${check.status ? 'bg-green-50' : 'bg-red-50'} rounded">
            <div>
                <div class="font-medium ${check.status ? 'text-green-800' : 'text-red-800'}">${check.name}</div>
                <div class="text-sm text-gray-600">${check.description}</div>
            </div>
            <div class="text-2xl">${check.status ? '✅' : '❌'}</div>
        </div>
    `).join('');
    
    showMessage('Privacy check completed!', 'success');
}

// Add some fun easter eggs
document.addEventListener('keydown', function(e) {
    // Press 'H' to show/hide history
    if (e.key === 'h' || e.key === 'H') {
        const historySection = document.querySelector('.bg-white.rounded-lg.shadow-lg.p-6:last-child');
        if (historySection) {
            historySection.classList.toggle('hidden');
        }
    }
    
    // Press 'M' to toggle map
    if (e.key === 'm' || e.key === 'M') {
        const mapSection = document.querySelector('#map').closest('.bg-white.rounded-lg.shadow-lg.p-6');
        if (mapSection) {
            mapSection.classList.toggle('hidden');
        }
    }
    
    // Press 'Q' to start quiz
    if (e.key === 'q' || e.key === 'Q') {
        if (currentTab === 'quiz') {
            startQuiz();
        } else {
            switchTab('quiz');
        }
    }
});

// New Network Tools Functions
function visualizeTopology() {
    const range = elements.topologyRange.value.trim();
    
    if (!range) {
        showMessage('Please enter a network range', 'error');
        return;
    }
    
    // Simulate network topology visualization
    elements.topologyResults.classList.remove('hidden');
    showMessage('Network topology visualization completed!', 'success');
}

function startProtocolCapture() {
    const interface = elements.protocolInterface.value;
    
    // Simulate protocol capture
    elements.protocolResults.classList.remove('hidden');
    showMessage('Protocol capture started!', 'success');
}

// New Security Tools Functions
function checkPassword() {
    const password = elements.passwordTest.value;
    
    if (!password) {
        showMessage('Please enter a password to test', 'error');
        return;
    }
    
    // Password strength analysis
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score++;
    else feedback.push('Password should be at least 8 characters long');
    
    if (/[a-z]/.test(password)) score++;
    else feedback.push('Include lowercase letters');
    
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Include uppercase letters');
    
    if (/[0-9]/.test(password)) score++;
    else feedback.push('Include numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Include special characters');
    
    let strength = '';
    let color = '';
    
    if (score <= 2) {
        strength = 'Weak';
        color = 'text-red-600';
    } else if (score <= 3) {
        strength = 'Fair';
        color = 'text-yellow-600';
    } else if (score <= 4) {
        strength = 'Good';
        color = 'text-blue-600';
    } else {
        strength = 'Strong';
        color = 'text-green-600';
    }
    
    elements.passwordStrength.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <span>Strength:</span>
            <span class="font-semibold ${color}">${strength}</span>
        </div>
        <div class="flex justify-between items-center mb-2">
            <span>Score:</span>
            <span class="font-mono ${color}">${score}/5</span>
        </div>
        ${feedback.length > 0 ? `
        <div class="mt-3">
            <div class="font-medium text-gray-700 mb-1">Suggestions:</div>
            <ul class="text-sm text-gray-600 space-y-1">
                ${feedback.map(f => `<li>• ${f}</li>`).join('')}
            </ul>
        </div>
        ` : '<div class="text-sm text-green-600 mt-2">✅ Great password!</div>'}
    `;
    
    elements.passwordResults.classList.remove('hidden');
    showMessage('Password analysis completed!', 'success');
}

function startSecurityScan() {
    const target = elements.securityScanTarget.value.trim();
    
    if (!target) {
        showMessage('Please enter a target network', 'error');
        return;
    }
    
    // Simulate security scan
    elements.securityScanResults.classList.remove('hidden');
    showMessage('Security scan completed!', 'success');
}

// Enhanced Quiz Functions
function shareResults() {
    const score = quizScore;
    const total = quizData.length;
    const percentage = Math.round((score / total) * 100);
    
    const shareText = `I scored ${score}/${total} (${percentage}%) on the Networking Quiz! 🎯🌐`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Networking Quiz Results',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showMessage('Results copied to clipboard!', 'success');
        }).catch(() => {
            showMessage('Unable to copy results', 'error');
        });
    }
}

// Enhanced quiz display functions
function showQuestion() {
    const question = quizData[currentQuestionIndex];
    elements.currentQuestionSpan.textContent = currentQuestionIndex + 1;
    elements.totalQuestionsSpan.textContent = quizData.length;
    elements.currentScore.textContent = quizScore;
    elements.maxScore.textContent = quizData.length;
    elements.questionText.textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
    
    // Create options with enhanced styling
    elements.optionsContainer.innerHTML = question.options.map((option, index) => `
        <button class="quiz-option w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all bg-white" 
                onclick="selectAnswer(${index})">
            <span class="font-medium">${String.fromCharCode(65 + index)}.</span> ${option}
        </button>
    `).join('');
    
    // Show/hide navigation buttons
    elements.nextQuestionBtn.classList.add('hidden');
    elements.finishQuizBtn.classList.add('hidden');
}

function selectAnswer(selectedIndex) {
    const question = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        quizScore++;
    }
    
    quizAnswers.push({
        question: question.question,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect,
        explanation: question.explanation
    });
    
    // Highlight correct and incorrect answers
    const options = elements.optionsContainer.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('bg-green-100', 'border-green-500');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('bg-red-100', 'border-red-500');
        }
        option.disabled = true;
    });
    
    // Show next/finish button
    if (currentQuestionIndex < quizData.length - 1) {
        elements.nextQuestionBtn.classList.remove('hidden');
    } else {
        elements.finishQuizBtn.classList.remove('hidden');
    }
}

function finishQuiz() {
    elements.quizContent.classList.add('hidden');
    elements.quizResults.classList.remove('hidden');
    
    const percentage = (quizScore / quizData.length) * 100;
    const incorrect = quizData.length - quizScore;
    
    // Update score display elements
    elements.correctAnswers.textContent = quizScore;
    elements.incorrectAnswers.textContent = incorrect;
    elements.percentageScore.textContent = `${Math.round(percentage)}%`;
    
    // Set score display
    if (percentage === 100) {
        elements.scoreEmoji.textContent = '🎉';
        elements.scoreText.textContent = 'Perfect Score!';
    } else if (percentage >= 80) {
        elements.scoreEmoji.textContent = '🌟';
        elements.scoreText.textContent = 'Excellent!';
    } else if (percentage >= 60) {
        elements.scoreEmoji.textContent = '👍';
        elements.scoreText.textContent = 'Good Job!';
    } else {
        elements.scoreEmoji.textContent = '📚';
        elements.scoreText.textContent = 'Keep Learning!';
    }
    
    elements.scoreDetails.textContent = `You got ${quizScore} out of ${quizData.length} questions correct!`;
    
    // Show question review with enhanced styling
    elements.questionReview.innerHTML = quizAnswers.map((answer, index) => `
        <div class="p-4 border rounded-lg ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}">
            <div class="font-medium mb-2 text-gray-800">Question ${index + 1}: ${answer.question}</div>
            <div class="text-sm text-gray-600 mb-2">
                Your answer: ${quizData[index].options[answer.selected]}
                ${answer.isCorrect ? '✅' : '❌'}
            </div>
            ${!answer.isCorrect ? `<div class="text-sm text-gray-600 mb-2">
                Correct answer: ${quizData[index].options[answer.correct]} ✅
            </div>` : ''}
            <div class="text-sm text-blue-600 bg-blue-50 p-2 rounded">💡 ${answer.explanation}</div>
        </div>
    `).join('');
}