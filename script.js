// ====================
// Q2: Event Tracking
// ====================
function logEvent(eventType, target) {
    const timestamp = new Date().toLocaleString(); // local time
    let objectType = target.tagName.toLowerCase();
    if (target.type) objectType = target.type;
    if (target.alt) objectType = "image";
    console.log(`${timestamp}, ${eventType}, ${objectType}`);
  }
  
  document.addEventListener("click", (e) => logEvent("click", e.target));
  window.addEventListener("load", () => {
    document.querySelectorAll("section").forEach((section) => {
      logEvent("view", section);
    });
  });
  
  // ====================
  // Q3: Text Analysis
  // ====================
  function analyzeText() {
    const text = document.getElementById("inputText").value;
  
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  
    const pronouns = ["he", "she", "they", "it", "we", "you", "i", "me", "him", "her", "us", "them"];
    const prepositions = ["on", "in", "at", "by", "for", "with", "about", "against", "between", "into"];
    const articles = ["a", "an", "the"];
  
    const wordsArray = text.toLowerCase().match(/\b\w+\b/g) || [];
  
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
  
    wordsArray.forEach(word => {
      if (pronouns.includes(word)) result.pronouns[word] = (result.pronouns[word] || 0) + 1;
      if (prepositions.includes(word)) result.prepositions[word] = (result.prepositions[word] || 0) + 1;
      if (articles.includes(word)) result.articles[word] = (result.articles[word] || 0) + 1;
    });
  
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
  