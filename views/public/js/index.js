const getLogin = () => {
  $.ajax({
    type: "get",
    url: "/users/login",
    async: true,
    success: function (result) {
      const loginModalElement = document.createElement("div");
      loginModalElement.style.width = "409px";
      loginModalElement.style.height = "363px";
      loginModalElement.style.position = "fixed";
      loginModalElement.style.border = "1px solid black";
      loginModalElement.id = "login-modal-element";

      loginModalElement.style.top = "50%";
      loginModalElement.style.left = "50%";
      loginModalElement.style.transform = "translate(-50%, -50%)";
      loginModalElement.innerHTML = result;

      document.getElementsByTagName("main")[0].appendChild(loginModalElement);
      addClickEventListener();
    },
    error: function (request, status, error) {
      console.log(error);
    },
  });
};

const addClickEventListener = () => {
  function callback(e) {
    const clickTarget = e.target;
    if (
      !clickTarget.id === "login-modal-element" ||
      !document.getElementById("login-modal-element").contains(clickTarget)
    ) {
      document.getElementById("login-modal-element").remove();
      document.removeEventListener("click", callback);
    }
  }

  document.addEventListener("click", callback);
};
