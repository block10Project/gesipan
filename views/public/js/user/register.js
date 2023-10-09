// const getRegister = () => {
//   document.getElementById("login-modal-element").remove();
//
//   $.ajax({
//     type: "get",
//     url: "/users/register",
//     async: true,
//     success: function (result) {
//       const registerModalElement = document.createElement("div");
//       console.log(result);
//       registerModalElement.style.width = "409px";
//       registerModalElement.style.height = "363px";
//       registerModalElement.style.position = "fixed";
//       registerModalElement.style.border = "1px solid black";
//       registerModalElement.id = "register-modal-element";
//       registerModalElement.style.backgroundColor = "rgb(248,248,248)";
//
//       registerModalElement.style.top = "50%";
//       registerModalElement.style.left = "50%";
//       registerModalElement.style.transform = "translate(-50%, -50%)";
//       registerModalElement.innerHTML = result;
//
//       document
//         .getElementsByTagName("main")[0]
//         .appendChild(registerModalElement);
//
//       addClickEventListener2();
//       addSubmitEventListener2();
//     },
//     error: function (request, status, error) {
//       console.log(error);
//     },
//   });
// };

const getRegister = () => {
  makeModal("get", "/users/register", "registerModalElement");
  addClickEventListener2();
  addSubmitEventListener2();
};
const addClickEventListener2 = () => {
  function callback(e) {
    const clickTarget = e.target;
    if (
      !clickTarget.id === "registerModalElement" ||
      !document.getElementById("registerModalElement").contains(clickTarget)
    ) {
      document.getElementById("registerModalElement").remove();
      document.removeEventListener("click", callback);
    }
  }

  document.addEventListener("click", callback);
};

const addSubmitEventListener2 = () => {
  document
    .getElementById("register-form-element")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const nickname = e.target[0].value;
      const id = e.target[1].value;
      const pw = e.target[2].value;

      $.ajax({
        type: "POST",
        url: "/users/register", //요청 할 URL
        data: {
          nickname: nickname,
          id: id,
          pw: pw,
        },
        dataType: "html",
        withCredentials: true,
        success: function (response, status, xhr) {
          console.log(response);
          const message = response.split("\n")[0];
          alert(message);
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
};
