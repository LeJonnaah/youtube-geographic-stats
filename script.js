document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json") // Load data from the JSON file
    .then(response => response.json())
    .then(data => {
      renderChart(data.all); // Render the data for all initially
      const filterButtons = document.querySelectorAll(".filter-button");
      filterButtons.forEach(button => {
        button.addEventListener("click", function () {
          const filterType = this.getAttribute("data-filter");
          const filteredData = data[filterType]; // Filter the data based on the selected filter
          renderChart(filteredData); // Render the corresponding data based on the selected filter

          // Remove the selected class from all buttons
          filterButtons.forEach(button => button.classList.remove("selected"));

          // Add the selected class to the clicked button
          this.classList.add("selected");
        });
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});

function renderChart(data) {
  const chartContainer = document.getElementById("chart");
  chartContainer.innerHTML = ""; // Clear any previous content

  data.forEach(item => {
    const barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");

    const countryLabel = document.createElement("div"); // Create a div element for the country label
    countryLabel.classList.add("country-label");
    countryLabel.textContent = item.country; // Set the text content of the country label
    barContainer.appendChild(countryLabel); // Add the country label to the bar container

    // Create a div element for the percentage
    const percentage = document.createElement("div");
    percentage.classList.add("percentage-label");
    percentage.textContent = item.value + "%";
    barContainer.appendChild(percentage); // Add the percentage to the bar container

    const bar = document.createElement("div");
    bar.classList.add("bar");
    const filledWidth = `${item.value}%`;
    bar.style.width = filledWidth;
    bar.setAttribute("data-country", item.country);
    bar.setAttribute("data-value", `${item.value}%`);
    barContainer.appendChild(bar);



    chartContainer.appendChild(barContainer);
  });
}

