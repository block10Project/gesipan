if (location.href.split("?")[1] !== undefined) {
  const url = location.href.split("?")[1].split("=")[1];
  alert(decodeURI(url));
  history.pushState(null, null, "/");
}

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
      console.log(elementName);

      document.getElementsByTagName("main")[0].appendChild(elementName);
    },
    error: function (request, status, error) {
      console.log(error);
    },
  });
};
