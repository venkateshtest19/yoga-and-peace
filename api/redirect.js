export default function handler(req, res) {
  // ==========================================
  // TOGGLE: Change this to false to turn OFF
  // ==========================================
  const isRedirectOn = true; 
  
  const destinationUrl = "https://www.google.com"; // Change this to your destination

  if (isRedirectOn) {
    // Sends the 302 Temporary Redirect
    res.status(302).setHeader("Location", destinationUrl).end();
  } else {
    // If turned off, just show a normal 200 OK status (or you can show a custom HTML page)
    res.status(200).send("This page is currently active.");
  }
}
