const getLogin = () => {
  makeModal("get", "/users/login", "loginModalElement");

  setTimeout(() => {
    addClickEventListener();
    addSubmitEventListener();
  }, 300);
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
        url: "/users/login",
        data: {
          id: id,
          pw: pw,
        },
        withCredentials: true,
        success: function (response, status, xhr) {
          const message = response.split("\n")[0];

          if (message == "<!DOCTYPE html>") {
            location.href = "/";
          } else {
            alert(message);
          }
        },
        error: function (error) {},
      });
    });
};
