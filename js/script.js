document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json") // Load data from the JSON file
    .then(response => response.json())
    .then(data => {
      renderChart(data.all); // Render the data for all initially
      const filterButtons = document.querySelectorAll(".filter-button");
      filterButtons.forEach(button => {
        button.addEventListener("click", function () {
          const selectedFilter = this.getAttribute("data-filter");
          renderChart(data[selectedFilter]);

          // Highlight the selected button
          filterButtons.forEach(button => {
            button.classList.remove("selected");
          });
          this.classList.add("selected");
        });

        // see more button from filtered data INVERTED
        const seeMoreButton = document.querySelector(".see-more");
        seeMoreButton.addEventListener("click", function () {
          const selectedFilter = getSelectedFilter();
          if (seeMoreButton.textContent === "See more") {
            seeMoreButton.textContent = "See less";
            renderChart(data[selectedFilter]);
          } else {
            seeMoreButton.textContent = "See more";
            renderChart(data[selectedFilter], true);
          }
        });
      });
    });
});

function getSelectedFilter() {
  const selectedButton = document.querySelector(".filter-button.selected");
  return selectedButton ? selectedButton.getAttribute("data-filter") : "videos";
}

function renderChart(data, showAll = false) {
  const chartContainer = document.getElementById("chart");
  chartContainer.innerHTML = ""; // Clear any previous content

  const entriesToRender = showAll ? data : data.slice(0, 5); // Show all entries if showAll is true

  entriesToRender.forEach(item => {
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