import React, { useEffect, useState } from 'react'
import { Route, Switch, Router, Link, NavLink } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap'
import history from './CbetHistory'
import { signInAuthProvider } from '../app/azure-auth/authProvider'
import { AzureAD, AuthenticationState } from 'react-aad-msal'
import styled from 'styled-components'
import Dashboard from './dashboard'
import Jobs from './jobs'
import Events from './events'
import Blogs from './blogs'
import CreateEdit from './create-edit.js'
import 'bootstrap/dist/css/bootstrap.min.css'

const StyledLink = styled(NavLink)`
  &.active {
    background-color: #3c3b54;
    border-left: 3px solid #a3a0fb;
  }
`
const FourOhFour = () => (
  <div>
    <h1>Page not found</h1>
    <p>
      Go back to <Link to="/">Dashboard</Link>.
    </p>
  </div>
)

const SideNav = () => (
  <Col
    md={2}
    className="p-0"
    style={{
      height: '100',
      minHeight: '100vh',
      color: 'whitesmoke',
      backgroundColor: '#43425d',
      display: 'block !important',
      overflow: 'hidden',
      position: 'sticky',
      top: '4 rem',
      zIndex: '1000',
    }}
  >
    <h5 className="pt-3 pb-3 pl-3" style={{ backgroundColor: '#3c3b54' }}>
      CBET Admin
    </h5>
    <Nav defaultActiveKey="/" className="flex-column" fill justify>
      <StyledLink exact to="/" className="nav-link text-light">
        Dashboard
      </StyledLink>
      <StyledLink to="/jobs" className="nav-link text-light">
        Jobs
      </StyledLink>
      <StyledLink to="/events" className="nav-link text-light">
        Events
      </StyledLink>
      <StyledLink to="/blogs" className="nav-link text-light">
        Blog
      </StyledLink>
    </Nav>
  </Col>
)

const App = () => {
  const [cbetContent, setCbetContent] = useState([])

  useEffect(() => {
    fetch(
      `https://cbetdata.azurewebsites.net/api/GetCbetContent?code=${process.env.cbetContentCode}`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setCbetContent(resultData)
      })
  }, [])

  const blogs = cbetContent.filter((post) => post.Category === 3)
  const events = cbetContent.filter((post) => post.Category === 2)
  const jobs = cbetContent.filter((post) => post.Category === 1)

  return (
    <AzureAD provider={signInAuthProvider} forceLogin={true}>
      {({ login, logout, authenticationState, error, accountInfo }) => {
        switch (authenticationState) {
          case AuthenticationState.Authenticated:
            return (
              <Router history={history}>
                <Container fluid>
                  <Row className="flex-xl-nowrap">
                    <SideNav />

                    <Col
                      md={10}
                      className="pb-5"
                      style={{ backgroundColor: '#f0f0f7' }}
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
                          <Col md={5}>
                            <Link to="/create-edit">
                              <Button variant="outline-primary">
                                Create New
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </Container>
                      <div id="main-content">
                        <div className="grid-row grid-gap">
                          <Switch>
                            <Route
                              exact
                              path="/"
                              render={(props) => (
                                <Dashboard
                                  title="Dashboard"
                                  content={cbetContent}
                                  {...props}
                                />
                              )}
                            />
                            <Route
                              path="/jobs"
                              render={(props) => (
                                <Jobs title="Jobs" jobs={jobs} {...props} />
                              )}
                            />
                            <Route
                              path="/events"
                              render={(props) => (
                                <Events
                                  title="Events"
                                  events={events}
                                  {...props}
                                />
                              )}
                            />
                            <Route
                              path="/blogs"
                              render={(props) => (
                                <Blogs title="Blogs" {...props} />
                              )}
                            />
                            <Route
                              path="/create-edit"
                              render={(props) => (
                                <CreateEdit title="Create / Edit" {...props} />
                              )}
                            />
                            <Route component={FourOhFour} />
                          </Switch>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Router>
            )
          case AuthenticationState.Unauthenticated:
            // TODO: Added a logout button but the AUth client kicks in....may not need this or authenticating state to the app
            return (
              <div>
                {error && (
                  <p>
                    <span>
                      An error occurred during authentication, please try again!
                    </span>
                  </p>
                )}
                <p>
                  <span>Please Login to continue.</span>
                  <Button onClick={login}>Login</Button>
                </p>
              </div>
            )
          case AuthenticationState.InProgress:
            return (
              <StyledLoadingBG>
                <p style={{ fontSize: '62px' }}>Authenticating...</p>
              </StyledLoadingBG>
            )
          default:
            return null
        }
      }}
    </AzureAD>
  )
}

export default App
