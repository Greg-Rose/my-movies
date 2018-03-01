import React, { Component } from 'react';
import ApiRequest from '../../api/apiRequest';
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: { color: 'danger', active: false, message: ''},
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      current_password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    let setAccountInfo = (response) => {
      this.setState({
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email
      });
    };

    ApiRequest.get('/account', setAccountInfo);
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
      password_confirmation: this.state.password_confirmation,
      current_password: this.state.current_password
    };

    if (credentials.current_password.trim().length === 0) {
      this.setState({ alert: { color: 'danger', active: true, message: "You must include your current password" } });
    }
    else {
      this.setState({ alert: { color: 'danger', active: false, message: '' } });
      ApiRequest.put('/account', credentials, (response) => {
        if (response.hasOwnProperty('message')) {
          let message = [];
          response.message.forEach((m, index) => {
            message.push(m);
            if (index !== response.message.length - 1) { message.push(<br key={index} />); }
          });
          this.setState({ alert: { color: 'danger', active: true, message: message } });
        }
        else {
          this.setState({
            alert: { color: 'info', active: true, message: "Account updated!" },
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            password: '',
            password_confirmation: '',
            current_password: ''
          });
        }
      });
    }
  }



  render() {
    return (
      <Row className="justify-content-center">
        <Col sm="8" lg="4">
          <Form id="my-account-form" onSubmit={this.onSubmit}>
            <h2 className="text-center">Update Account</h2>
            <Alert color={this.state.alert.color} isOpen={this.state.alert.active}>{this.state.alert.message}</Alert>

            <FormGroup>
              <Input type="text" name="first_name" id="first_name" placeholder="First Name" onChange={this.onChange} value={this.state.first_name} />
            </FormGroup>

            <FormGroup>
              <Input type="text" name="last_name" id="last_name" placeholder="Last Name" onChange={this.onChange} value={this.state.last_name} />
            </FormGroup>

            <FormGroup>
              <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} value={this.state.email} />
            </FormGroup>

            <FormGroup>
              <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} value={this.state.password} />
            </FormGroup>

            <FormGroup>
              <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" onChange={this.onChange} value={this.state.password_confirmation} />
            </FormGroup>

            <FormGroup>
              <Input type="password" name="current_password" id="current_password" placeholder="Current Password" onChange={this.onChange} value={this.state.current_password} />
            </FormGroup>

            <Button block>Update</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Account;
