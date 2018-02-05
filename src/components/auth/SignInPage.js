import React, { Component } from 'react';
import './SignInPage.css';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import authApi from '../../api/authApi';
import { NavLink } from 'react-router-dom';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.redirect();
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
      .then(() => this.redirect());
  }

  redirect() {
    if(authApi.userSignedIn()) {
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col col-sm-8 col-lg-4">
          <Form id="sign-in-form" onSubmit={this.onSubmit}>
            <h2 className="text-center">Sign In</h2>
            <FormGroup>
              <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
            </FormGroup>

            <Button block>Sign In</Button>

            <NavLink to="/sign_up">Sign Up</NavLink>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignInPage;
