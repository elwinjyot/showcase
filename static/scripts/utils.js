import Tools from "./tools.js";

export default class Utils extends Tools {
  constructor() {
    super();
    this.globalErrorContainer = ".error-container";
    this.passValidation = {
      is_lengthValid: false,
      is_matchValid: false,
    };
    this.colors = {
      errorRed: "#ff6174",
      successGreen: "#97cf6e",
    };
  }

  // Login User
  handleLogin = (formId) => {
    const form = $(formId);
    const loginBtn = $("#loginBtn");
    const usernameInput = this.findInputElementFromParent(form, "username");
    const passwordInput = this.findInputElementFromParent(form, "password");
    this.spinnerAnimation(loginBtn);
    let loginData = {
      username: usernameInput.val(),
      password: passwordInput.val(),
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    };
    $.ajax({
      method: "POST",
      url: "/auth/login/",
      data: loginData,
      success: (response) => {
        if (response == 200) {
          setTimeout(() => {
            loginBtn.html(`<i class="far fa-check"></i>`);
            setTimeout(() => {
              window.location.replace("/");
            }, 1000);
          }, 1000);
        } else if (response == 401) {
          setTimeout(() => {
            usernameInput.css({ border: "1px solid " + this.colors.errorRed });
            passwordInput.css({ border: "1px solid " + this.colors.errorRed });
            this.setErrorMessage(
              this.globalErrorContainer,
              this.colors.errorRed,
              "Password or Username does not match!"
            );
            loginBtn.text("Login");
            form.trigger("reset");
            console.error("Credentials does not match!");
          }, 1000);
        }
      },
    });
  };

  // Register User
  hangleSignup = (formId) => {
    if (
      this.passValidation.is_lengthValid &&
      this.passValidation.is_matchValid
    ) {
      const form = $(formId);
      const inputFields = $(form).find("input");
      const signupBtn = $("#signupBtn");
      let signupData = {
        name:
          $(this.findInputElementFromParent(form, "firstname")).val() +
          " " +
          $(this.findInputElementFromParent(form, "lastname")).val(),
        email: $(this.findInputElementFromParent(form, "email")).val(),
        username: $(this.findInputElementFromParent(form, "username")).val(),
        password: $(this.findInputElementFromParent(form, "password2")).val(),
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      };
      this.spinnerAnimation($("#signupBtn"));
      $.ajax({
        method: "POST",
        url: "/auth/join/",
        headers: { action: "create-user" },
        data: signupData,
        success: (response) => {
          if (response.status) {
            signupBtn.html(`<i class="far fa-check"></i>`);
            for (let index = 0; index < inputFields.length; index++) {
              const input = inputFields[index];
              this.setCheckingAnimation(index, input);
            }
            setTimeout(() => {
              window.location.replace("/");
            }, 2000);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      if (this.passValidation.is_lengthValid === false) {
        this.setErrorMessage(
          this.globalErrorContainer,
          this.colors.errorRed,
          "Password too short!"
        );
      } else if (this.passValidation.is_matchValid === false) {
        this.setErrorMessage(
          this.globalErrorContainer,
          this.colors.errorRed,
          "Password does not match!"
        );
      }
    }
  };

  // Text changing animation
  changeTextAnim = () => {
    const texts = ["Product", "Brand", "Life", "Time"];
    const container = $("#changing-text");
    let index = 1;
    setInterval(() => {
      if (index >= texts.length) {
        index = 1;
      }
      container.text(texts[index]);
      index++;
    }, 3000);
  };

  // Like a post
  likePost = (post) => {
    let postId = $(post).attr("data-postId");
    let cat = $(post).attr("data-cat");
    const postElement = $(`#post${cat}${postId}`);
    if (postElement.attr("data-state") === "true") {
      postElement.find("i").css({ color: "#333" });
      postElement.attr("data-state", "false");
    } else {
      postElement.find("i").css({ color: "#db4437" });
      postElement.attr("data-state", "true");
    }
    $.ajax({
      method: "POST",
      url: `/like-post/${cat}/${postId}/`,
      data: {
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      },
      success: (response) => {
        if (response.body.liked) {
          postElement.html(
            `${response.body.likes} <i class="fas fa-heart" style="color: #db4437;" data-postId="${postId}" data-cat="${cat}">`
          );
        } else {
          postElement.html(
            `${response.body.likes} <i class="fas fa-heart"  data-postId="${postId}" data-cat="${cat}">`
          );
        }
      },
    });
  };

  // Follow User
  followUser = (element) => {
    let data = {
      followerId: $(element).attr("data-following-userId"),
      profileId: $(element).attr("data-profileId"),
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    };
    $(element).html(`<i class="far fa-minus"></i>Unfollow`);
    $(element).attr("id", "unfollow-btn");
    $.ajax({
      method: "POST",
      url: `/profile/${data.profileId}/`,
      headers: {
        action: "follow",
      },
      data: data,
      success: (response) => {
        $("#follower-count").text(response.body.followers);
      },
    });
  };

  // Unfollow User
  unfollowUser = (element) => {
    let data = {
      followerId: $(element).attr("data-following-userId"),
      profileId: $(element).attr("data-profileId"),
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    };
    $(element).html(`<i class="far fa-plus"></i>Follow`);
    $(element).attr("id", "follow-btn");
    $.ajax({
      method: "POST",
      url: `/profile/${data.profileId}/`,
      headers: {
        action: "unfollow",
      },
      data: data,
      success: (response) => {
        $("#follower-count").text(response.body.followers);
      },
    });
  };
}
