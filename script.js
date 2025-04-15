//this script.js is already included in index.html, this is the javascript for q2 and q3

// Q2: Event Tracking

// Logs a specific event with its timestamp, event type, and the object interacted with
function logEvent(eventType, target) {
  const timestamp = new Date().toLocaleString(); // Get the current local timestamp

  // Determine the object type
  let objectType = target.tagName.toLowerCase(); // Default to tag name (e.g., button, img)
  if (target.type) objectType = target.type; // If input type exists, use it (e.g., text, checkbox)
  if (target.alt) objectType = "image"; // If image has alt attribute, label it as "image"

  // Log the event details in the format: timestamp, eventType, objectType
  console.log(`${timestamp}, ${eventType}, ${objectType}`);
}

// Track all clicks on the page
document.addEventListener("click", (e) => logEvent("click", e.target));

// Log a "view" event for each <section> when the page loads
window.addEventListener("load", () => {
  document.querySelectorAll("section").forEach((section) => {
      logEvent("view", section);
  });
});


// Q3: Text Analysis Tool

// Analyzes the entered text and displays metrics like letter count, word count, etc.
function analyzeText() {
  const text = document.getElementById("inputText").value; // Get user input from textarea

  // Count different text elements using regex
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

  // Define word lists to count specific types of words
  const pronouns = ["he", "she", "they", "it", "we", "you", "i", "me", "him", "her", "us", "them"];
  const prepositions = ["on", "in", "at", "by", "for", "with", "about", "against", "between", "into"];
  const articles = ["a", "an", "the"];

  // Convert all words in the input to lowercase and extract them
  const wordsArray = text.toLowerCase().match(/\b\w+\b/g) || [];

  // Store the analysis results
  const result = {
      letters,
      words,
      spaces,
      newlines,
      specialSymbols,
      pronouns: {},
      prepositions: {},
      articles: {},
  };

  // Count occurrences of each pronoun, preposition, and article
  wordsArray.forEach(word => {
      if (pronouns.includes(word)) result.pronouns[word] = (result.pronouns[word] || 0) + 1;
      if (prepositions.includes(word)) result.prepositions[word] = (result.prepositions[word] || 0) + 1;
      if (articles.includes(word)) result.articles[word] = (result.articles[word] || 0) + 1;
  });

  // Display results in the designated output <div>
  const outputDiv = document.getElementById("results");
  outputDiv.innerHTML = `
      <p><strong>Letters:</strong> ${result.letters}</p>
      <p><strong>Words:</strong> ${result.words}</p>
      <p><strong>Spaces:</strong> ${result.spaces}</p>
      <p><strong>Newlines:</strong> ${result.newlines}</p>
      <p><strong>Special Symbols:</strong> ${result.specialSymbols}</p>
      <h3>Pronouns Count:</h3><pre>${JSON.stringify(result.pronouns, null, 2)}</pre>
      <h3>Prepositions Count:</h3><pre>${JSON.stringify(result.prepositions, null, 2)}</pre>
      <h3>Indefinite Articles Count:</h3><pre>${JSON.stringify(result.articles, null, 2)}</pre>
  `;
}
