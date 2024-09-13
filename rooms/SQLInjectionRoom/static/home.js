function performSearch() {
    const searchInput = document.getElementById("search");
    const searchResultsContainer = document.getElementById(
        "search-results-container"
    );
    const query = searchInput.value;
    fetch(
        `http://${API_HOSTNAME}:${API_PORT}/api/v1/homework/?search_term=${query}`
    )
        .then((response) => response.json())
        .then((data) => {
            const searchResultsHTML = generateSearchResultsHTML(data);
            searchResultsContainer.innerHTML = searchResultsHTML;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function generateSearchResultsHTML(results) {
    let html = "<ul>";
    for (const result of results) {
        html += `<li>${result[0]} - ${result[1]} - ${result[2]}</li>`;
    }
    html += "</ul>";
    return html;
}

document.querySelector("button").addEventListener("click", performSearch);

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var links = document.querySelectorAll(".show-tasks-link");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the link, open the modal
links.forEach(function (link) {
    link.addEventListener("click", function () {
        var subjectName = this.getAttribute("data-subject");
        var dueDate = "2023-12-31";
        var teacherName = "JLO Kracher";
        document.getElementById("subjectName").innerHTML = subjectName;
        document.getElementById("dueDate").innerHTML = dueDate;
        document.getElementById("teacherName").innerHTML = teacherName;
        modal.style.display = "flex"; // Use flex to center the modal
    });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
