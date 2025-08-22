document.addEventListener("DOMContentLoaded", function () {
  // Fix <img data-src>
  document.querySelectorAll("img[data-src]").forEach(img => {
    img.setAttribute("src", img.getAttribute("data-src"));
  });

  // Fix div/section with data-src (backgrounds)
  document.querySelectorAll("[data-src]").forEach(el => {
    if (el.tagName !== "IMG") {
      el.style.backgroundImage = "url('" + el.getAttribute("data-src") + "')";
    }
  });
});
