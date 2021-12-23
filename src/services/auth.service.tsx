import axios from "axios";

const API_URL = "https://412505r54f.imdo.co/naivechair/author/";

class AuthService {
  async login(formData: FormData) {
    console.log(formData);
    let response = await axios({
      method: "post",
      url: API_URL + "signin/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    }
    );
    if (response.status == 200) {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    }
    return response.data;

  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(formData: FormData) {
    console.log(formData);
    let response = await axios({
      method: "post",
      url: API_URL + "signup/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    }
    );

    console.log(response);

    if (response.status != 200) {
      console.log("Error: " + response.statusText);
    }
    return response.data;
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();