document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      renderChart(data.all, false); 
      const filterButtons = document.querySelectorAll(".filter-button");
      filterButtons.forEach(button => {
        button.addEventListener("click", function () {
          const selectedFilter = this.getAttribute("data-filter");
          renderChart(data[selectedFilter], false);

          filterButtons.forEach(button => {
            button.classList.remove("selected");
          });
          this.classList.add("selected");

          const seeMoreButton = document.querySelector(".see-more");
          seeMoreButton.textContent = "See more";
        });

        const seeMoreButton = document.querySelector(".see-more");
        seeMoreButton.addEventListener("click", function () {
          const selectedFilter = getSelectedFilter();
          const selectedData = data[selectedFilter];
          if (seeMoreButton.textContent === "See more") {
            seeMoreButton.textContent = "See less";
            renderChart(selectedData, true);
          } else {
            seeMoreButton.textContent = "See more";
            renderChart(selectedData, false);
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
  chartContainer.innerHTML = ""; 

  const entriesToRender = showAll ? data : data.slice(0, 5);

  entriesToRender.forEach(item => {
    const barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");

    const countryLabel = document.createElement("div");
    countryLabel.classList.add("country-label");
    countryLabel.textContent = item.country;
    barContainer.appendChild(countryLabel); 

    const percentage = document.createElement("div");
    percentage.classList.add("percentage-label");
    percentage.textContent = item.value + "%";
    barContainer.appendChild(percentage);

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