// const getLogin = () => {
//   $.ajax({
//     type: "get",
//     url: "/users/login",
//     async: true,
//     success: function (result) {
//       const loginModalElement = document.createElement("div");
//       loginModalElement.style.width = "409px";
//       loginModalElement.style.height = "363px";
//       loginModalElement.style.position = "fixed";
//       loginModalElement.style.border = "1px solid black";
//       loginModalElement.id = "login-modal-element";
//       loginModalElement.style.backgroundColor = "rgb(248,248,248)";
//       loginModalElement.style.border = "none";
//       loginModalElement.style.borderRadius = "6px";
//
//       loginModalElement.style.top = "50%";
//       loginModalElement.style.left = "50%";
//       loginModalElement.style.transform = "translate(-50%, -50%)";
//       loginModalElement.innerHTML = result;
//
//       document.getElementsByTagName("main")[0].appendChild(loginModalElement);
//       addClickEventListener();
//       addSubmitEventListener();
//     },
//     error: function (request, status, error) {
//       console.log(error);
//     },
//   });
// };
const getLogin = () => {
  makeModal("get", "/users/login", "loginModalElement");
  addClickEventListener();
  addSubmitEventListener();
};

const addClickEventListener = () => {
  function callback(e) {
    const clickTarget = e.target;
    if (
      !clickTarget.id === "loginModalElement" ||
      !document.getElementById("loginModalElement").contains(clickTarget)
    ) {
      document.getElementById("loginModalElement").remove();

      document.removeEventListener("click", callback);
    }
  }

  document.addEventListener("click", callback);
};

const addSubmitEventListener = () => {
  document
    .getElementById("login-form-element")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const id = e.target[0].value;
      const pw = e.target[1].value;

      $.ajax({
        type: "POST",
        url: "/users/login", //요청 할 URL
        data: {
          id: id,
          pw: pw,
        },
        // dataType: "html",
        withCredentials: true,
        success: function (response, status, xhr) {
          const message = response.split("\n")[0];
          alert(message);
        },
        error: function (error) {},
      });
    });
};
