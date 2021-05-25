import React from 'react';
import userAuth from '../userAuth.js'

class  UserLogin extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleLoginChange(event) {
    this.setState({login: event.target.value});
    
  }
  
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    userAuth.login(this.state.login, this.state.password)
    .then(()=>{
      this.props.history.push("/home");
      window.location.reload();
    });
    
  }

  render() {
    return (
      <div>
        <div><h3>UserLogin</h3></div>
        <form onSubmit={this.handleSubmit}>
          <label>Login:</label>
          <input value={this.state.login} onChange={this.handleLoginChange} />
          <label>Password:</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} />
          <input type="submit" value="Sign in" />
        </form>
      </div>
    );
  }
};

export default UserLogin;
 