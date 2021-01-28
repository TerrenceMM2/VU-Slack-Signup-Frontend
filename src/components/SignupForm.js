import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from "axios";
import Alert from "../components/Alert";
import ReCAPTCHA from "react-google-recaptcha";

export default class SignupForm extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        alertShow: false,
		alertTitle: "",
        alertBody: "",
        isLoading: false,
        recaptchaRef: React.createRef(),
        recaptchaSet: false,
        recaptchaValue: null
    }

    styles = {
        button: {
            float: "right",
            color: "#333"
        },
        helper: {
            color: "#777"
        },
        counter: {
            color: "#777"
        },
        buttonProgress: {
            color: "#D8AB4C",
            float: "right",
            position: "relative",
            top: "8px",
            left: "54px"
        },
        recaptcha: {
            display: "inline"
        }
    }

    handleRecaptcha = recaptchaValue => {
        this.setState({ recaptchaValue });
        if (recaptchaValue !== null) this.setState({ recaptchaSet: true });
    }

    handleClose = () => {
        this.setState({ alertShow: false });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
		this.setState({ [name]: value });
    };
    
    handleSubmitForm = (event) => {

        const { firstName, lastName, email, message } = this.state;

        this.setState({ isLoading: true });

        if (this.state.recaptchaSet === false) {
            this.setState({
                alertTitle: "Are you a robot?",
                alertBody: "Please check the reCAPTCHA box.",
                alertShow: true,
                isLoading: false
            })
        } else {
                axios({
                    method: "post",
                    url: "https://cors-anywhere.herokuapp.com/https://eta0k8k1pf.execute-api.us-east-2.amazonaws.com/prod/api/submit", 
                    data: {
                        "name": `${firstName.trim()} ${lastName.trim()}`,
                        "email": email.trim(),
                        "msg": message.trim()
                    }
                }).then((res) => {
                    this.setState({
                        firstName: "",
                        lastName: "",
                        email: "",
                        message: "",
                        alertTitle: res.data.msgTitle,
                        alertBody: res.data.msgBody,
                        alertShow: true,
                        isLoading: false,
                        recaptchaSet: false,
                        recaptchaValue: null
                    })
                }).catch((err) => {
                    this.setState({
                        firstName: "",
                        lastName: "",
                        email: "",
                        message: "",
                        alertTitle: err.data.msgTitle,
                        alertBody: err.data.msgBody,
                        alertShow: true,
                        isLoading: false
                    })
                })
            };
        }

        

    render() {
        return (
            <div>
                <ValidatorForm ref="form" onSubmit={this.handleSubmitForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextValidator
                                validators={['required']}
                                errorMessages={['This field is required.']}
                                fullWidth
                                style={this.styles.input}
                                id="firstName"
                                label="First Name *"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                variant="outlined"
                                inputProps={{
                                    maxLength: 40,
                                }}
                                InputProps={{
                                    endAdornment: <FormHelperText style={this.styles.counter}>{this.state.firstName.length}/40</FormHelperText>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextValidator
                                validators={['required']}
                                errorMessages={['This field is required.']}
                                fullWidth
                                style={this.styles.input}
                                id="lastName"
                                label="Last Name *"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                variant="outlined"
                                inputProps={{
                                    maxLength: 40,
                                }}
                                InputProps={{
                                    endAdornment: <FormHelperText style={this.styles.counter}>{this.state.lastName.length}/40</FormHelperText>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                fullWidth
                                label="Email *"
                                id="email"
                                style={this.styles.input}
                                onChange={this.handleInputChange}
                                name="email"
                                value={this.state.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['This field is required', 'Email is not valid.']}
                                variant="outlined"
                                inputProps={{
                                    maxLength: 40,
                                }}
                                InputProps={{
                                    endAdornment: <FormHelperText style={this.styles.counter}>{this.state.email.length}/40</FormHelperText>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                fullWidth
                                validators={['required']}
                                errorMessages={['This field is required']}
                                style={this.styles.input}
                                id="message"
                                label="Message *"
                                name="message"
                                value={this.state.message}
                                onChange={this.handleInputChange}
                                rows={"4"}
                                multiline={true}
                                variant="outlined"
                                inputProps={{
                                    maxLength: 400,
                                }}
                                InputProps={{
                                    endAdornment: <FormHelperText style={this.styles.counter}>{this.state.message.length}/400</FormHelperText>
                                }}
                            />
                            <FormHelperText style={this.styles.helper}>Please provide proof of your alumni status. (e.g. LinkedIn Profile Link, Name of Reference, etc.)</FormHelperText>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <ReCAPTCHA
                                style={{ display: "inline-block"}}
                                theme="dark"
                                ref={this.state.recaptchaRef}
                                sitekey={process.env.REACT_APP_SITE_KEY}
                                onChange={this.handleRecaptcha}
                                />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Button
                                color="primary"
                                style={this.styles.button}
                                variant="contained"
                                disabled={this.state.isLoading}
                                type="submit">
                                Submit
                            </Button>
                            {this.state.isLoading && <CircularProgress size={24} style={this.styles.buttonProgress} />}
                        </Grid>
                    </Grid>
                </ValidatorForm>
                <Alert
                    alertTitle={this.state.alertTitle}
                    handleClose={this.handleClose}
                    open={this.state.alertShow}
                    alertBody={this.state.alertBody}
                />
            </div>
        )
    }
}
