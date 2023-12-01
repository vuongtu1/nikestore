import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "cus1",
      txtPassword: "123",
      alertMessage: "",
    };
  }

  renderAlert() {
    if (this.state.alertMessage) {
      return (
        <div className="bg-red-500 text-white p-3 mb-4 rounded">
          {this.state.alertMessage}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 dark:bg-gray-800">
          <h2 className="text-center text-2xl font-bold mb-4 dark:text-white">
            CUSTOMER LOGIN
          </h2>
          {this.renderAlert()}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">
                Username
              </label>
              <input
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">
                Password
              </label>
              <input
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                onClick={(e) => this.btnLoginClick(e)}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      this.setState({ alertMessage: "Please input username and password" });
    }
  }

  // apis
  apiLogin(account) {
    axios
    .post("/api/customer/login", account)
    .then((res) => {
      const result = res.data;
      console.log("Signup response:", res.data);
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate("/home");
      } else {
        this.setState({ alertMessage: result.message });
      }
    });
  }
}

export default withRouter(Login);
