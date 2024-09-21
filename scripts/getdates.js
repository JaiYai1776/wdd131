// Get the current year and set it in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date and set it in the footer
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Updated: ${lastModified}`;
