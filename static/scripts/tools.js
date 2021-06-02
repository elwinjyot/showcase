export default class Tools {
  findInputElementFromParent = (parent, inputName) => {
    const element = $(parent).find("input[name=" + inputName + "]");
    return element;
  };

  setErrorMessage = (container, color, message) => {
    $(container).html(`<p style="color: ` + color + `;">` + message + `</p>`);
  };

  flushErrorMessage = (container) => {
    $(container).html("");
  };

  validatePasswordLength = (password) => {
    const initialPassLength = password.length;
    if (initialPassLength < 6) {
      return { status: false, error: "Password is too short!" };
    } else {
      return { status: true, error: null };
    }
  };
  validatePasswordMatch = (password1, password2) => {
    if (password1 === password2) {
      return { status: true, error: null };
    } else {
      return { status: false, error: "Passwords does not match!" };
    }
  };

  setCheckingAnimation = (index, element) => {
    setTimeout(function () {
      $(element).css({ "box-shadow": "0px 0px 0px 3px " + "#97cf6e" });
    }, 300 * index);
  };

  spinnerAnimation = (parentElement) => {
    const spinner = `<i class="fad fa-spin fa-spinner-third" id="spinner"></i>`;
    const spinnerId = "#spinner";
    $(parentElement).html(spinner);
  };
}
