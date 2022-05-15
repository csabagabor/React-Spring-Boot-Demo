class AuthenticationService {
  registerSuccessfulLoginAdmin(username) {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", "admin");
    console.log("Successful login admin");
  }

  registerSuccessfulLoginUser(username) {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", "user");
    console.log("Successful login user");
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload(false);
  }

  isUserLoggedIn() {
    let role = sessionStorage.getItem("role");
    return role === "user";
  }

  isAdminLoggedIn() {
    let role = sessionStorage.getItem("role");
    return role === "admin";
  }

  getLoggedInUser() {
    let username = sessionStorage.getItem("authenticatedUser");
    if (username == null) {
      return "";
    } else {
      return username;
    }
  }

  setUpToken(jwtToken) {
    localStorage.setItem("token", jwtToken);
  }
}

export default new AuthenticationService();
