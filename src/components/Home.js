import React from 'react';
import userAuth from '../userAuth';

class  Home extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        currentUser: '',
      };
  }

  componentDidMount() {
    const user = userAuth.getCurrentUser();
    
    if (user) {
      this.setState({currentUser: user});
    } 
  }

 
  
  render() {
    return (
      <div>
        <h3>Home</h3>
        {this.state.currentUser && 
            <div>
                Hello, {this.state.currentUser.userLogin}
            </div>
        }
        {!this.state.currentUser && 
            <div>
                Hello Guest!
            </div>
        }
      </div>
    );
  }
};

export default Home;
 