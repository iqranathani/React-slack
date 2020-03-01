import React,{Component} from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false
    };

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = { message: 'Fill in all fields'};
            this.setState({ errors: errors.concat(error) })
            return false;
        }else if(!this.isPasswordValid(this.state)){
            error = { message: 'Password is Invalid'};
            this.setState({ errors: errors.concat(error) })
            return false;
        }else {
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, passwordConfirmation}) => {
        // return !username.length || !email.length || !password.length ||
        // !passwordConfirmation.length

        if (!username.length || !email.length || !password.length || !passwordConfirmation.length){
            return true
        }
    }

    isPasswordValid = ({ password, passwordConfirmation}) => {
        if (password.length < 6 || passwordConfirmation.length < 6){
            return false;
        }else if(password !== passwordConfirmation){
            return false;   
        }else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid()){
            this.setState({ errors: [], loading: true });
        firebase
           .auth()
           .createUserWithEmailAndPassword(this.state.email, this.state.password)
           .then(createdUser => {
               console.log(createdUser);
               this.setState({ loading: false });
           })
           .catch(err => {
               console.log(err);
               this.setState({ errors: this.state.errors.concat(err), loading: false });
           });
        }
    }

    render() {
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <GridColumn style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large" >
                        <Segment stacked>
                            <Form.Input 
                              fluid name="username" 
                              icon="user" 
                              iconPosition="left"
                              placeholder="Username" 
                              onChange={this.handleChange} 
                              type="text" 
                              value={username}
                            />

                            <Form.Input 
                              fluid name="email" 
                              icon="mail" 
                              iconPosition="left"
                              placeholder="Email Address" 
                              onChange={this.handleChange} 
                              type="email"
                              value={email} 
                              className={
                                  errors.some(error =>
                                    error.message.toLowerCase.includes("email")
                                )
                                ? "error"
                                : ""
                              }
                            />

                            <Form.Input 
                              fluid name="password" 
                              icon="lock" 
                              iconPosition="left"
                              placeholder="Password" 
                              onChange={this.handleChange} 
                              type="password"
                              value={password} 
                            />

                            <Form.Input 
                              fluid name="passwordConfirmation" 
                              icon="repeat" 
                              iconPosition="left"
                              placeholder="Password Confirmation" 
                              onChange={this.handleChange} 
                              type="password"
                              value={passwordConfirmation} 
                            />

                            <Button disabled={loading} className={ loading ? 'loading' : '' }
                             color="orange" fluid size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to="/Login">Login</Link></Message>
                </GridColumn>
            </Grid>
        )
    }
}

export default Register;