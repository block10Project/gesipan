const makeModal = (method, url, elementName) => {
  const name = elementName;

  $.ajax({
    type: method,
    url: url,
    async: true,
    success: function (result) {
      elementName = document.createElement("div");
      elementName.style.width = "409px";
      elementName.style.height = "363px";
      elementName.style.position = "fixed";
      elementName.style.border = "1px solid black";

      elementName.id = name;
      elementName.style.backgroundColor = "rgb(248,248,248)";
      elementName.style.border = "none";
      elementName.style.borderRadius = "6px";

      elementName.style.top = "50%";
      elementName.style.left = "50%";
      elementName.style.transform = "translate(-50%, -50%)";
      elementName.innerHTML = result;
      document.getElementsByTagName("main")[0].appendChild(elementName);
    },
    error: function (request, status, error) {
      console.log(error);
    },
  });
};

// const originalURL = window.location.href.split("?");
// if (originalURL.length <= 2) {
//   const newURL = window.location.href.split("?")[0];
//   window.history.replaceState({}, "", newURL);
// }
