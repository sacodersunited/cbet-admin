import React from 'react'
import {
  Col,
  Container,
  Row,
  ListGroup,
  Jumbotron,
  Button,
  Accordion,
  Card,
  Badge,
} from 'react-bootstrap'
import Moment from 'react-moment'
import { FaRegCalendar, FaToolbox, FaNewspaper } from 'react-icons/fa'

export default function Dashboard(props) {
  function handleEdit(e, cbetContent) {
    e.preventDefault()
    console.log('clicked edit', cbetContent, props)

    props.history.push('https://cbet.edu/admin/create-edit', cbetContent)
  }

  const activeBlogs = props.content.filter(
    (post) => post.Category === 3 && post.Status === true
  )
  const activeEvents = props.content.filter(
    (post) => post.Category === 2 && post.Status === true
  )
  const activeJobs = props.content.filter(
    (post) => post.Category === 1 && post.Status === true
  )

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Jumbotron>
            <h1>CBET Administration</h1>
            <p>
              Welcome to the Administration portion of the CBET website! Here
              you will be able to manage all your CBET content.
            </p>
            <p>
              <a href="mailto:webmaster@cbet.edu?Subject=Cbet Update">
                <Button variant="primary">Email Cbet Web Team</Button>
              </a>
            </p>
          </Jumbotron>

          <Accordion defaultActiveKey="-1">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                style={{ cursor: 'pointer' }}
                variant="primary"
              >
                Active Jobs{' '}
                <Badge variant="secondary">{activeJobs.length}</Badge>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <ListGroup variant="flush">
                  {activeJobs.map((job) => (
                    <ListGroup.Item
                      action
                      variant="secondary"
                      onClick={(e) => handleEdit(e, job)}
                    >
                      <FaToolbox style={{ verticalAlign: 'middle' }} />
                      <span
                        style={{ verticalAlign: 'middle' }}
                      >{` ${job.Title}`}</span>
                      <Badge
                        variant="outline"
                        style={{
                          height: '20px',
                          marginLeft: '5px',
                          verticalAlign: 'middle',
                        }}
                      >
                        <Moment format="MM/DD">{job.StartDate}</Moment>
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="1"
                style={{ cursor: 'pointer' }}
              >
                Active Events{' '}
                <Badge variant="success">{activeEvents.length}</Badge>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <ListGroup variant="flush">
                  {activeEvents.map((event) => (
                    <ListGroup.Item
                      action
                      variant="success"
                      onClick={(e) => handleEdit(e, event)}
                    >
                      <FaRegCalendar />{' '}
                      <span
                        style={{ verticalAlign: 'middle' }}
                      >{` ${event.Title}`}</span>
                      <Badge
                        variant="outline"
                        style={{
                          height: '20px',
                          marginLeft: '5px',
                          verticalAlign: 'middle',
                        }}
                      >
                        <Moment format="MM/DD">{event.StartDate}</Moment>
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="2"
                style={{ cursor: 'pointer' }}
              >
                Active Blogs <Badge variant="info">{activeBlogs.length}</Badge>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <ListGroup variant="flush">
                  {activeBlogs.map((blog) => (
                    <ListGroup.Item
                      action
                      variant="info"
                      onClick={(e) => handleEdit(e, blog)}
                    >
                      <FaNewspaper />
                      <span
                        style={{ verticalAlign: 'middle' }}
                      >{` ${blog.Title}`}</span>
                      <Badge
                        variant="outline"
                        style={{
                          height: '20px',
                          marginLeft: '5px',
                          verticalAlign: 'middle',
                        }}
                      >
                        <Moment format="MM/DD">{blog.StartDate}</Moment>
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col md={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <iframe
            width="100%"
            height="900"
            src="https://datastudio.google.com/embed/reporting/3f03ff9d-fae7-4d26-86dd-25e90cbf0073/page/1M"
            frameborder="0"
            style={{ border: '0' }}
            allowfullscreen
          ></iframe>
        </Col>
      </Row>
    </Container>
  )
}
