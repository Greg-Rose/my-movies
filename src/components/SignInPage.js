import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import authApi from '../api/authApi';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if(authApi.userSignedIn()) {
      this.props.history.replace('/');
    }
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    authApi.signIn(credentials)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col col-sm-8 col-lg-4">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" onChange={this.onChange} />
            </FormGroup>

            <Button>Sign In</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignInPage;
