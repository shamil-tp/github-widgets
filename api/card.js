// api/card.js
module.exports = async (req, res) => {
  // Extract query parameters with fallbacks
  const { title = "System Status", status = "OPERATIONAL", theme = "dark" } = req.query;

  const isDark = theme === "dark";
  const bgColor = isDark ? "#0d1117" : "#ffffff";
  const textColor = isDark ? "#58a6ff" : "#0969da";
  const borderColor = isDark ? "#30363d" : "#d0d7de";
  const statusColor = status === "OPERATIONAL" ? "#2ea44f" : "#cf222e";

  // Raw SVG string rendering live content
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120" fill="none">
      <style>
        .header { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; fill: ${textColor}; }
        .status { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; fill: ${statusColor}; }
        .subtext { font-family: monospace; font-size: 11px; fill: #8b949e; }
        .card { rx: 8px; ry: 8px; stroke: ${borderColor}; stroke-width: 1px; fill: ${bgColor}; }
      </style>
      
      <rect width="398" height="118" x="1" y="1" class="card" />
      
      <text x="20" y="40" class="header">${title}</text>
      
      <circle cx="25" cy="70" r="5" fill="${statusColor}" />
      <text x="38" y="74" class="status">${status}</text>
      
      <text x="20" y="100" class="subtext">UPDATED: ${new Date().toUTCString()}</text>
    </svg>
  `;

  // Prevent GitHub's Camo proxy from caching the SVG forever
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=60, stale-while-revalidate=120");
  res.status(200).send(svg);
};