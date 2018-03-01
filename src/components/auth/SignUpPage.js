import React, { Component } from 'react';
import './SignInPage.css';
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import authApi from '../../api/authApi';
import { NavLink } from 'react-router-dom';
import hasEmptyValue from '../../helpers/helperFuncs';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    if (hasEmptyValue(this.state)) {
      this.setState({ alert: "Please fill out all fields" });
    }
    else {
      this.setState({ alert: false });
      authApi.signUp(credentials)
        .then(() => this.redirect());
    }
  }

  redirect() {
    if(authApi.userSignedIn()) {
      this.props.history.replace('/');
    }
    else if (!hasEmptyValue(this.state)) {
      this.setState({ alert: "Email already in use" });
    }
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col sm="8" lg="4">
          <Form id="sign-up-form" onSubmit={this.onSubmit}>
            <h2 className="text-center">Sign Up</h2>
            <Alert color="danger" isOpen={!!this.state.alert}>{this.state.alert}</Alert>

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
        </Col>
      </Row>
    );
  }
}

export default SignUpPage;
