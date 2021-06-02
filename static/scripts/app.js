import Utils from "./utils.js";

const util = new Utils();

// Handle Login
$("#loginForm").submit((event) => {
  event.preventDefault();
  util.handleLogin("#loginForm");
});

// Validate Registration Form
// Validate Username
$(util.findInputElementFromParent("#signupForm", "username")).change(
  (event) => {
    const usernameInputField = event.target;
    let username = usernameInputField.value;
    $.ajax({
      method: "GET",
      url: "/auth/join/",
      headers: { action: "check-username" },
      data: {
        username: username,
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
      },
      success: (response) => {
        console.log(response.status);
        if (response.status === false) {
          console.error(response.error);
          util.setErrorMessage(
            util.globalErrorContainer,
            util.colors.errorRed,
            response.error
          );
        } else {
          util.flushErrorMessage(util.globalErrorContainer);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
);

// Validate Length
$(util.findInputElementFromParent("#signupForm", "password1")).change(
  (event) => {
    const elementState = util.validatePasswordLength(event.target.value);
    const passFieldElement = $(event.target);
    if (elementState.status == false) {
      passFieldElement.css({ border: "1px solid " + util.colors.errorRed });
      util.setErrorMessage(
        util.globalErrorContainer,
        util.colors.errorRed,
        "Password too short!"
      );
    } else {
      passFieldElement.css({ border: "none" });
      util.flushErrorMessage(util.globalErrorContainer);
      util.passValidation.is_lengthValid = elementState.status;
    }
  }
);

// Validate match
$(util.findInputElementFromParent("#signupForm", "password2")).change(
  (event) => {
    const elementState = util.validatePasswordMatch(
      util.findInputElementFromParent("#signupForm", "password1").val(),
      event.target.value
    );
    const passFieldElement = $(event.target);
    if (elementState.status == false) {
      passFieldElement.css({ border: "1px solid " + util.colors.errorRed });
      util.setErrorMessage(
        util.globalErrorContainer,
        util.colors.errorRed,
        "Passwords does not match!"
      );
    } else {
      passFieldElement.css({ border: "none" });
      util.flushErrorMessage(util.globalErrorContainer);
      util.passValidation.is_matchValid = elementState.status;
    }
  }
);

// Handle Registration
$("#signupForm").submit((event) => {
  event.preventDefault();
  util.hangleSignup("#signupForm");
});

// Like a post
$("body").on("click", ".likePost", function (event) {
  const element = $(event.target);
  console.log(element);
  util.likePost(element);
});

// Follow user
$("body").on("click", "#follow-btn", function () {
  const element = "#follow-btn";
  util.followUser(element);
});

// Unfollow user
$("body").on("click", "#unfollow-btn", function () {
  const element = "#unfollow-btn";
  util.unfollowUser(element);
});

// Create Post
// Open Menu
$(".create-post").click(() => {
  $(".new-post-opt-wrapper").toggleClass("open-opt-menu");
});
$(".new-post-opt-wrapper").mouseleave(() => {
  $(".new-post-opt-wrapper").removeClass("open-opt-menu");
});
export { util };
