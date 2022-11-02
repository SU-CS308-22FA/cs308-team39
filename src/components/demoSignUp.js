import React, { Component } from "react";
import { projectFirestore } from "../firebase/config";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", username: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "A name was submitted: " +
        this.state.email +
        this.state.password +
        this.state.username
    );
    projectFirestore
      .collection("users")
      .add(this.state)
      .then(() => {
        console.log("User added!");
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label> email </label>
          <input
            type="text"
            name="email"
            size="15"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label> password </label>
          <input
            type="text"
            name="password"
            size="15"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <label> username </label>
          <input
            type="text"
            name="username"
            size="15"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
export default SignUp;
