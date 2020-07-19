import React from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import Moment from 'react-moment'
import { FaPen, FaTimes } from 'react-icons/fa'
import { showActive, showDate, showAuthor } from './utils/admin'
import styled from 'styled-components'

const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export default function Blogs(props) {
  function handleEdit(e, cbetContent) {
    e.preventDefault()
    console.log('clicked edit', cbetContent, props)

    props.history.push('/create-edit', cbetContent)
  }

  function handleDelete(e, post) {
    const shouldDelete = confirm(
      `Do you really want to delete this Blog titled ${post.Title} ?`
    )
    if (shouldDelete) {
      deleteBlog(post)
    }
  }

  function deleteBlog(post) {
    // console.log('reached delete blog', post, e)

    let cbetContent = {
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

    console.log('payload', cbetContent)

    const payload = new FormData()
    payload.append('file', null)
    payload.append('cbetContent', JSON.stringify(cbetContent))

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

      console.log('Delete Response', response)

      // Adds Build hook fetch if any Blog is updated/created
      // const buildHookInit = {
      //   method: 'POST',
      // }
      // fetch(
      //   'https://api.netlify.com/build_hooks/5cf3ea316717989ed33fb674',
      //   // cbet.edu hook -> 'https://api.netlify.com/build_hooks/5ecebf26051d938410c0d4fc',
      //   buildHookInit
      // )

      if (response.ok) {
        alert(`Blog ${post.Title} was deleted.`)
        props.history.push('/blogs')
      }
    } catch (e) {
      console.log(`catch error: ${e}`)
    }
  }

  return (
    <Container>
      <Row>
        {props.blogs.map((post) => (
          <Col md={4}>
            <Card key={post.Id} className="mb-3">
              <Card.Header className="d-flex justify-content-between">
                {post.CategoryName}
                <div className="meta-edit">
                  <FaPen
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleEdit(e, post)}
                  />
                  <FaTimes
                    style={{ cursor: 'pointer' }}
                    className="ml-2"
                    onClick={(e) => handleDelete(e, post)}
                  />
                </div>
              </Card.Header>
              <Card.Body style={{ minHeight: '200px' }}>
                <Card.Title className="d-flex justify-content-between">
                  {post.Title}
                  <Badge variant="primary" style={{ height: '24px' }}>
                    <Moment format="MM/DD">{post.StartDate}</Moment>
                  </Badge>
                </Card.Title>
                <Card.Text style={{ minHeight: '190px' }}>
                  <MetaSection>
                    {showActive(post.Status)}
                    {showDate('Published Date', post.StartDate)}
                    {showDate(
                      'Modified Date',
                      post.ModifyDate,
                      post.CreatedDate
                    )}
                    {showAuthor(post.Author)}
                  </MetaSection>
                  {/* copied from stack overflow, do not trust */}
                  {/* https://stackoverflow.com/questions/55418929/how-can-i-remove-html-markup-from-strings-in-state-data/55419024 */}
                  {post.Description.slice(0, 140).replace(
                    /<\/?[^>]+(>|$)/g,
                    ''
                  ) + '...'}
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
