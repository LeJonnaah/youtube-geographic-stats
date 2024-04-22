document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById('toggleButton');
  toggleButton.addEventListener('click', function () {
    invertColors();
  });
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

function invertColors() {
  document.body.classList.toggle('inverted');
  const mainElement = document.querySelector('main');
  mainElement.classList.toggle('inverted');
  const barContainers = document.querySelectorAll('.bar');
  barContainers.forEach(container => {
    container.classList.toggle('inverted');
  })
  const countryLabels = document.querySelectorAll('.country-label');
  countryLabels.forEach(label => {
    label.classList.toggle('inverted');
  })
  const percentageLabels = document.querySelectorAll('.percentage-label');
  percentageLabels.forEach(label => {
    label.classList.toggle('inverted');
  })
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.classList.toggle('inverted');
    if (button.classList.contains('selected')) {
      button.classList.toggle('inverted');
    }
  });
  const selectedButton = document.querySelector('.filter-button.selected');
  if (selectedButton) {
    selectedButton.classList.toggle('inverted');
  }
}