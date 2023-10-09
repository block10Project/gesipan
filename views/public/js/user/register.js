const getRegister = () => {
  makeModal("get", "/users/register", "registerModalElement");

  setTimeout(() => {
    addClickEventListener2();
    addSubmitEventListener2();
  }, 300);
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
        url: "/users/register",
        data: {
          nickname: nickname,
          id: id,
          pw: pw,
        },
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
