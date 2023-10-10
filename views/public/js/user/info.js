const getInfo = (uid) => {
  makeModal("get", `/users/info?id=${uid}`, "infoModalElement");

  setTimeout(() => {
    addClickEventListener3();
  }, 300);
};

const addClickEventListener3 = () => {
  function callback(e) {
    const clickTarget = e.target;
    if (
      !clickTarget.id === "infoModalElement" ||
      !document.getElementById("infoModalElement").contains(clickTarget)
    ) {
      document.getElementById("infoModalElement").remove();

      document.removeEventListener("click", callback);
    }
  }

  document.addEventListener("click", callback);
};
