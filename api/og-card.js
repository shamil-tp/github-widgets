module.exports = async (req, res) => {
  const {
    name = "Shamil TP",
    role = "Full Stack Developer",
    stack = "Node.js • Backend • DevOps",
    portfolio = "shamiltp.me",
    github = "shamil-tp",
    linkedin = "shamil-tp",
    theme = "yellow"
  } = req.query;

  // Format full URLs for href attributes
  const portfolioUrl = portfolio.startsWith("http") ? portfolio : `https://${portfolio}`;
  const githubUrl = github.startsWith("http") ? github : `https://github.com/${github}`;
  const linkedinUrl = linkedin.startsWith("http") ? linkedin : `https://www.linkedin.com/in/${linkedin}`;

  // Neo-Brutalism accent palettes
  const palettes = {
    yellow: { accent: "#FFDE59", badge: "#FF914D", border: "#000000" },
    cyan: { accent: "#5271FF", badge: "#00C2CB", border: "#000000" },
    green: { accent: "#00E676", badge: "#FF5722", border: "#000000" },
    purple: { accent: "#CB6CE6", badge: "#FF66C4", border: "#000000" }
  };

  const currentTheme = palettes[theme] || palettes.yellow;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="315" viewBox="0 0 600 315" fill="none">
      <style>
        .bold-text { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 900; }
        .mono-text { font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace; font-weight: 700; }
        
        /* Neo-Brutalist Shadow Effects */
        .card-bg { fill: #FFFDF5; stroke: ${currentTheme.border}; stroke-width: 4px; }
        .shadow { fill: ${currentTheme.border}; }
        .header-box { fill: ${currentTheme.accent}; stroke: ${currentTheme.border}; stroke-width: 3px; }
        .badge { fill: ${currentTheme.badge}; stroke: ${currentTheme.border}; stroke-width: 2px; }
        .grid-box { fill: #FFFFFF; stroke: ${currentTheme.border}; stroke-width: 3px; cursor: pointer; }
        
        /* Hover Effect for Links */
        .link-group:hover .grid-box { fill: #F4F4F5; }
      </style>

      <!-- Neo-Brutalism Offset Drop Shadow -->
      <rect x="12" y="12" width="576" height="291" rx="10" class="shadow" />
      
      <!-- Main Card Body -->
      <rect x="4" y="4" width="576" height="291" rx="10" class="card-bg" />

      <!-- Top Accent Banner Grid -->
      <rect x="24" y="24" width="536" height="64" rx="6" class="shadow" />
      <rect x="20" y="20" width="536" height="64" rx="6" class="header-box" />
      
      <text x="40" y="58" class="bold-text" font-size="28" fill="#000000">${name}</text>
      
      <!-- Status Badge inside Header -->
      <rect x="424" y="36" width="116" height="32" rx="16" class="shadow" />
      <rect x="420" y="32" width="116" height="32" rx="16" class="badge" />
      <text x="478" y="53" class="mono-text" font-size="12" fill="#FFFFFF" text-anchor="middle">AVAILABLE</text>

      <!-- Role & Stack Details Grid -->
      <rect x="24" y="104" width="536" height="100" rx="6" class="shadow" />
      <rect x="20" y="100" width="536" height="100" rx="6" class="grid-box" />

      <text x="40" y="136" class="bold-text" font-size="18" fill="#000000">${role}</text>
      <text x="40" y="162" class="mono-text" font-size="13" fill="#555555">${stack}</text>
      
      <!-- Decorative Neo-Brutalist Grid Divider Line -->
      <line x1="20" y1="180" x2="556" y2="180" stroke="${currentTheme.border}" stroke-width="2" stroke-dasharray="6 6" />

      <!-- Social & Links Footer Grid -->
      <g transform="translate(20, 220)">
        <!-- Portfolio Link Box -->
        <a href="${portfolioUrl}" target="_blank" rel="noopener noreferrer" class="link-group">
          <rect x="4" y="4" width="168" height="52" rx="6" class="shadow" />
          <rect x="0" y="0" width="168" height="52" rx="6" class="grid-box" />
          <text x="14" y="22" class="mono-text" font-size="10" fill="#777777">PORTFOLIO</text>
          <text x="14" y="40" class="bold-text" font-size="13" fill="#000000">🌐 ${portfolio}</text>
        </a>

        <!-- GitHub Link Box -->
        <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="link-group">
          <rect x="188" y="4" width="168" height="52" rx="6" class="shadow" />
          <rect x="184" y="0" width="168" height="52" rx="6" class="grid-box" />
          <text x="198" y="22" class="mono-text" font-size="10" fill="#777777">GITHUB</text>
          <text x="198" y="40" class="bold-text" font-size="13" fill="#000000">octocat /${github}</text>
        </a>

        <!-- LinkedIn Link Box -->
        <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="link-group">
          <rect x="372" y="4" width="164" height="52" rx="6" class="shadow" />
          <rect x="368" y="0" width="164" height="52" rx="6" class="grid-box" />
          <text x="382" y="22" class="mono-text" font-size="10" fill="#777777">LINKEDIN</text>
          <text x="382" y="40" class="bold-text" font-size="13" fill="#000000">in /${linkedin}</text>
        </a>
      </g>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=60, stale-while-revalidate=120");
  res.status(200).send(svg);
};