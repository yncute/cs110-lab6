function loadContent(page) {
  const xhr = new XMLHttpRequest();

  //get data from url
  xhr.open("GET", page, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      //changes content to the body of the html file
      document.getElementById("content").innerHTML = xhr.responseText;
    } else {
      document.getElementById("content").innerHTML =
        "<p>Error loading content</p>";
    }
  };
  xhr.send();
}

// Load the home page by default
window.onload = function () {
  loadContent("new-book.html");
};
