import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import Moment from 'react-moment'
import { FaPen, FaTimes } from 'react-icons/fa'
import { showActive, showDate, showAddress } from './utils/admin'
import styled from 'styled-components'

const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`
export default function Events(props) {
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

  function handleEdit(e, cbetContent) {
    e.preventDefault()

    props.history.push('/create-edit', cbetContent)
  }

  function handleDelete(e, post) {
    const shouldDelete = confirm(
      `Do you really want to delete this Event titled ${post.Title} ?`
    )
    if (shouldDelete) {
      deleteEvent(post)
    }
  }

  function deleteEvent(post) {
    let cbetEvent = {
      ID: post.Id, // number
      ContentTitle: post.Title, // string
      Description: '', // HTML for blog
      Thumbnail: '',
      PartnerName: '', // string
      Author: '', // string
      ContentCreator: '', // string
      Status: false, // string
      CbetCategory: post.CbetCategory_Id, // number
      Link: '', // string
      StartDate: post.StartDate, // date
      EndDate: post.EndDate, // date
      Location: '', // string
      Tags: 'one,two', // string
      Featured: false, // bool
      Delete: true,
    }

    console.log('payload', cbetEvent)

    const payload = new FormData()
    payload.append('file', null)
    payload.append('cbetEvent', JSON.stringify(cbetEvent))

    const myInit = {
      method: 'POST',
      body: payload,
    }

    try {
      // const response = fetch('http://localhost:7071/api/GetCbetContent', myInit)
      const response = fetch(
        `https://cbetdata.azurewebsites.net/api/GetCbetContent?code=${process.env.cbetContentCode}`,
        myInit
      )

      response.then((resp) => {
        if (resp.status === 200) {
          alert(`Event ${post.Title} was deleted.`)
          props.history.push('/events')
        } else {
          alert(
            `There was an error deleting the Event. Status code:${resp.status}`
          )
        }
      })
    } catch (e) {
      console.log(`catch error: ${e}`)
    }
  }

  const events = cbetContent.filter((post) => post.Category === 2)

  return (
    <Container>
      <Row>
        {events.map((event) => (
          <Col md={4}>
            <Card key={event.Id} className="mb-3">
              <Card.Header className="d-flex justify-content-between">
                {event.CategoryName}
                <div className="meta-edit">
                  <FaPen
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleEdit(e, event)}
                  />
                  <FaTimes
                    style={{ cursor: 'pointer' }}
                    className="ml-2"
                    onClick={(e) => handleDelete(e, job)}
                  />
                </div>
              </Card.Header>
              <Card.Body style={{ minHeight: '200px' }}>
                <Card.Title className="d-flex justify-content-between">
                  {event.Title}
                  <Badge variant="primary" style={{ height: '24px' }}>
                    <Moment format="MM/DD">{event.StartDate}</Moment>
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <MetaSection>
                    {showActive(event.Status)}
                    {showDate(
                      'Modified Date',
                      event.ModifyDate,
                      event.CreatedDate
                    )}
                    {showDate('Start Date', event.StartDate)}
                    {showDate('End Date', event.EndDate)}
                    {showAddress(event.Location)}
                  </MetaSection>
                </Card.Text>
                <a href={event.Link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-primary">Event Link</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
