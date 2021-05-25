import React from 'react';
import userAuth from '../userAuth.js'

class  UserRegister extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      registerResultMessage: '',
      registered: false,
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
       event.preventDefault();
      userAuth.register(this.state.login, this.state.password)
      .then((json)=>{
        this.setState({
          registerResultMessage: 'User registered successfuly!', 
          registered: true
        })

        //  this.setState({
        //  registerResultMessage: '',
        //  registered: false

        //this.props.history.push("/login");
        //window.location.reload();
      })
      .catch(error => {
        this.setState({
          registerResultMessage: 'UserRegister catch error: '+ error.message,
          registered: false
        });
      })
  }

  render() {
    return (
      <div>
        <div><h3>UserRegister</h3></div>
        <form onSubmit={this.handleSubmit}>
          
          {!this.state.registered &&
          <div>
            <label>Login:</label>
            <input value={this.state.login} onChange={this.handleLoginChange} />
            <label>Password:</label>
            <input value={this.state.password} onChange={this.handlePasswordChange} />
            <input type="submit" value="Sign up" />
          </div>
          }

          {this.state.registerResultMessage && (
            
            ((this.state.registered) && 
              <div>
                {this.state.registerResultMessage}
              </div>)
            || 
            ((!this.state.registered) && 
              <div>
                {this.state.registerResultMessage}
              </div>)

                        
          )}

        </form>
      </div>
    );
  }
};

export default UserRegister;
 