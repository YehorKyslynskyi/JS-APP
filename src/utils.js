export function isValidInputValue(value) {
  return value.length >= 10;
}

export function showModal() {
  showCover();
  const modal = document.querySelector("#login-form-container");
  modal.style.display = "block";
}

export function hideModal() {
  hideCover();
  const modal = document.querySelector("#login-form-container");
  modal.style.display = "none";
}
function showCover() {
  const coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";

  document.body.style.overflowY = "hidden";

  document.body.append(coverDiv);
}

export function hideCover() {
  document.getElementById("cover-div").remove();
  document.body.style.overflowY = "";
}
