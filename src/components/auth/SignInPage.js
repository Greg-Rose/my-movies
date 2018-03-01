import React, { Component } from 'react';
import './SignInPage.css';
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import authApi from '../../api/authApi';
import { NavLink } from 'react-router-dom';
import hasEmptyValue from '../../helpers/helperFuncs';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      email: '',
      password: ''
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
      email: this.state.email,
      password: this.state.password
    };

    if (hasEmptyValue(this.state)) {
      this.setState({ alert: "Email and password can't be blank" });
    }
    else {
      this.setState({ alert: false });
      authApi.signIn(credentials)
        .then(() => this.redirect());
    }
  }

  redirect() {
    if(authApi.userSignedIn()) {
      this.props.history.replace('/');
    }
    else if (!hasEmptyValue(this.state)) {
      this.setState({ alert: "Email and password are incorrect" });
    }
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col sm="8" lg="4">
          <Form id="sign-in-form" onSubmit={this.onSubmit}>
            <h2 className="text-center">Sign In</h2>
            <Alert color="danger" isOpen={!!this.state.alert}>{this.state.alert}</Alert>

            <FormGroup>
              <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
            </FormGroup>

            <Button block>Sign In</Button>

            <NavLink to="/sign_up">Sign Up</NavLink>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SignInPage;
