const previewConts = document.querySelectorAll(".item > a > .content-image");
const imgs = ["randomPixel", "randomLine", "randomLineOnClick", "gravity"];

for (let i = 0; i < previewConts.length; i++) {
  previewConts[i].style.backgroundImage = `
    url(./pages/images/${imgs[i]}-preview.png)
  `;
  previewConts[i].style.backgroundPosition = "center";
  previewConts[i].style.borderRadius = "20px 20px 0 0";
}
