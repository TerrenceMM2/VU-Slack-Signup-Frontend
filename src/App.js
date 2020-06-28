import React, {Component} from 'react';
import SignupForm from "./components/SignupForm";

import Container from "@material-ui/core/Container";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#D8AB4C',
            main: '#D8AB4C',
            dark: '#D8AB4C',
            contrastText: '#fff'
        }
    },
    typography: {
        fontFamily: ['Source Sans Pro'].join(','),
        fontWeightLight: 300,
        fontWeightRegular: 500,
        fontWeightMedium: 700,
        fontSize: 16
    },
    overrides: {
      MuiInputLabel: {
        root: {
          color: '#FFF',
        }
      },
      MuiInputBase: {
        root: {
            color: '#FFF'
        }
      },
      MuiOutlinedInput: {
        root: {
          "& fieldset": {
            borderColor: "#444"
          }
        }
      },
      MuiDialog: {
        paper: {
          backgroundColor: "#333"
        }
      }
    }
});

export class App extends Component {

  styles = {
      headerLogo: {
          display: "block",
          margin: "0 auto",
          maxWidth: "85vw",
          marginTop: "2rem"
      },
      title: {
          color: "#FFF",
          textAlign: "center",
          marginTop: "4rem"
      }
  }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <img style={this.styles.headerLogo} src="./header.png" alt="page header"/>
                    <h1 style={this.styles.title}>Slack Signup Form</h1>
                    <Container maxWidth="md">
                        <SignupForm/>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App