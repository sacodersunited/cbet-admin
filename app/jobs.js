import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import Moment from 'react-moment'
import { FaPen, FaTimes } from 'react-icons/fa'
import { showActive, showDate } from './utils/admin'
import styled from 'styled-components'

const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`
export default function Jobs(props) {
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
      `Do you really want to delete this Job titled ${post.Title} ?`
    )
    if (shouldDelete) {
      deleteJob(post)
    }
  }

  function deleteJob(post) {
    let cbetJob = {
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

    console.log('payload', cbetJob)

    const payload = new FormData()
    payload.append('file', null)
    payload.append('cbetJob', JSON.stringify(cbetJob))

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
          alert(`Job ${post.Title} was deleted.`)
          const history = useHistory()
          history.go()
        } else {
          alert(
            `There was an error deleting the Job. Status code:${resp.status}`
          )
        }
      })
    } catch (e) {
      console.log(`catch error: ${e}`)
    }
  }

  const jobs = cbetContent.filter((post) => post.Category === 1)

  return (
    <Container>
      <Row>
        {jobs.map((job) => (
          <Col md={4}>
            <Card key={job.Id} className="mb-3">
              <Card.Header className="d-flex justify-content-between">
                {job.CategoryName}
                <div className="meta-edit">
                  <FaPen
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleEdit(e, job)}
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
                  {job.Title}
                  <Badge variant="primary" style={{ height: '24px' }}>
                    <Moment format="MM/DD">{job.StartDate}</Moment>
                  </Badge>
                </Card.Title>
                <Card.Text style={{ minHeight: '170px' }}>
                  <MetaSection>
                    {showActive(job.Status)}
                    {showDate('Modified Date', job.ModifyDate, job.CreatedDate)}
                  </MetaSection>
                  {/* copied from stack overflow, do not trust */}
                  {/* https://stackoverflow.com/questions/55418929/how-can-i-remove-html-markup-from-strings-in-state-data/55419024 */}
                  {job.Description.slice(0, 140).replace(
                    /<\/?[^>]+(>|$)/g,
                    ''
                  ) + '...'}
                </Card.Text>
                <a href={job.Link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-primary">Apply Link</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
