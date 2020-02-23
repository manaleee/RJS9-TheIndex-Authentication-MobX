import { decorate, observable } from "mobx";
import jwt_decode from "jwt-decode";
import { instance } from "./instance";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthStore {
  user = null;

  setUser = token => {
    if (token) {
      this.user = jwt_decode(token);
      instance.defaults.headers.common.Authorization = `jwt ${token}`;
      localStorage.setItem("token", token);
    } else {
      this.user = null;
      delete instance.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
    }
  };

  signup = async newUser => {
    try {
      const res = await instance.post("/signup/", newUser);
      const user = res.data;
      this.setUser(user.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  login = async newUser => {
    try {
      const res = await instance.post("/login/", newUser);
      const user = res.data;
      this.setUser(user.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  logout = () => {
    this.setUser();
  };
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
// authStore.checkForToken();

export default authStore;
