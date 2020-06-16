import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { signInAuthProvider } from "../app/azure-auth/authProvider";
import { AzureAD, AuthenticationState } from "react-aad-msal";

class Dashboard extends React.Component {
  render() {
    return (
      <AzureAD provider={signInAuthProvider} forceLogin={true}>
        {({ login, logout, authenticationState, error, accountInfo }) => {
          switch (authenticationState) {
            case AuthenticationState.Authenticated:
              return (
                <Container fluid>
                  <Row className="flex-xl-nowrap">
                    {/* <SideNav /> */}
                    <Col
                      md={10}
                      className="pb-5"
                      style={{ backgroundColor: "#f0f0f7" }}
                    >
                      <Navbar expand="lg" variant="light" bg="light">
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                          <NavDropdown
                            title={`Signed in as ${accountInfo.account.name}`}
                            id="basic-nav-dropdown"
                          >
                            <NavDropdown.Item onClick={logout}>
                              Logout
                            </NavDropdown.Item>
                          </NavDropdown>
                        </Navbar.Collapse>
                      </Navbar>
                      <Container>
                        <Row className="pt-5 pb-5">
                          <Col md={3}>Title</Col>
                          <Col md={2}>
                            <Button
                              variant="outline-primary"
                              // onClick={createNewCbetContent}
                            >
                              Create New
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                      {/* {children} */}
                    </Col>
                  </Row>
                </Container>
              );

            case AuthenticationState.Unauthenticated:
              // TODO: Added a logout button but the AUth client kicks in....may not need this or authenticating state to the app
              return (
                <div>
                  {error && (
                    <p>
                      <span>
                        An error occurred during authentication, please try
                        again!
                      </span>
                    </p>
                  )}
                  <p>
                    <span>Please Login to continue.</span>
                    <Button onClick={login}>Login</Button>
                  </p>
                </div>
              );
            case AuthenticationState.InProgress:
              // TODO: ADD Cbet Styles for unauthenticating
              return (
                // <StyledLoadingBG>
                <p style={{ fontSize: "62px" }}>Authenticating...</p>
                // </StyledLoadingBG>
              );
            default:
              return null;
          }
        }}
      </AzureAD>
    );
  }
}

export default Dashboard;
