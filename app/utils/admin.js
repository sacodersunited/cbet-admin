import React from 'react'
import { FaCircle, FaCalendar, FaPen, FaGlobe } from 'react-icons/fa'
import Moment from 'react-moment'

// cat is short for category
export const showActive = (catIsActive) => {
  return catIsActive ? (
    <small>
      <FaCircle
        className="mr-1"
        color="#5EE2A0"
        style={{ verticalAlign: 'baseline' }}
      />
      Active
    </small>
  ) : (
    <small>
      <FaCircle
        className="mr-1"
        color="#E25E5E"
        style={{ verticalAlign: 'baseline' }}
      />
      Disabled
    </small>
  )
}

export const showDate = (title, catDate, createDate) => {
  return (
    <small>
      <FaCalendar
        className="mr-1"
        color="#A5A4BF"
        style={{ verticalAlign: 'baseline' }}
      />
      {title}:{' '}
      <Moment format="MM/DD/YYYY">{catDate ? catDate : createDate}</Moment>
    </small>
  )
}

export const showAuthor = (author) => {
  return (
    <small>
      <FaPen
        className="mr-1"
        color="#A5A4BF"
        style={{ verticalAlign: 'baseline' }}
      />
      Author: {author}
    </small>
  )
}

export const showAddress = (address) => {
  return (
    <small>
      <FaGlobe
        className="mr-1"
        color="#A5A4BF"
        style={{ verticalAlign: 'baseline' }}
      />
      {address}
    </small>
  )
}
