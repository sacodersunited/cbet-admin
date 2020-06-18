import React, { useState, useEffect } from 'react'
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
  return (
    <Container>
      <Row>
        {props.events.map((event) => (
          <Col md={4}>
            <Card key={event.Id} className="mb-3">
              <Card.Header className="d-flex justify-content-between">
                {event.CategoryName}
                <div className="meta-edit">
                  <FaPen
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleEdit(e, event)}
                  />
                  <FaTimes style={{ cursor: 'pointer' }} className="ml-2" />
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
