document.addEventListener("DOMContentLoaded", function () {
    // Update footer with current year
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;

    // Update footer with last modified date
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = lastModified;

    // Wind Chill Calculation for Taiwan
    const temperature = 25; // static value in °C
    const windSpeed = 10; // static value in km/h

    function calculateWindChill(temp, wind) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
    }

    if (temperature <= 10 && windSpeed > 4.8) {
        document.getElementById("windChill").textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        document.getElementById("windChill").textContent = "N/A";
    }
});
