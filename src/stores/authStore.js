import { decorate, observable } from "mobx";
import jwt_decode from "jwt-decode";
import { instance } from "./instance";

class AuthStore {
  user = null;

  //   -------------- set user --------------------------------
  setUser = token => {
    if (token) {
      this.user = jwt_decode(token);
      instance.defaults.headers.common.Authorization = `JWT ${token}`;
      localStorage.setItem("myToken", token);
    } else {
      localStorage.removeItem("myToken");
      this.user = null;
      delete instance.defaults.headers.common.Authorization;
    }
  };

  //   --------------  sign up ----------------------------------
  signupUser = async (userData, history) => {
    try {
      const res = await instance.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      const data = res.data;
      this.setUser(data.token);
      history.push("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  //   -------------- login ----------------------------------

  loginUser = async userData => {
    try {
      const res = await instance.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const data = res.data;
      this.setUser(data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  //   -------------- logout ----------------------------------

  logoutUser = () => {
    this.setUser();
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const decodeToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodeToken.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.setUser();
      }
    }
  };
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
