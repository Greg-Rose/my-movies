import React, { Component } from 'react';
import './SignInPage.css';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import authApi from '../../api/authApi';
import { NavLink } from 'react-router-dom';


class SignUpPage extends Component {
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    authApi.signUp(credentials)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col col-sm-8 col-lg-4">
          <Form id="sign-up-form" onSubmit={this.onSubmit}>
            <h2 className="text-center">Sign Up</h2>

            <FormGroup>
              <Input type="text" name="first_name" id="first_name" placeholder="First Name" onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <Input type="text" name="last_name" id="last_name" placeholder="Last Name" onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" onChange={this.onChange} />
            </FormGroup>

            <Button block>Sign Up</Button>

            <NavLink to="/sign_in">Sign In</NavLink>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
