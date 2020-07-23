import React, { useState, useEffect } from 'react'
import { Col, Form } from 'react-bootstrap'
import { calculateDays, formatDate } from '../utils/utility'

const year = new Date().getFullYear()
const years = Array.from(new Array(40), (val, index) => year + 2 - index)

export default function CbetDatePicker(props) {
  const [daysSelected, setDaysSelected] = useState(31) // number of days in month
  const [addMonth, setAddMonth] = useState('') // Month selected to add
  const [addDay, setAddDay] = useState('') // Day selected to add
  const [addYear, setAddYear] = useState('') // Year selected to add
  const [daysLength, setDaysLength] = useState(0) // number of days selected

  useEffect(() => {
    if (props.defaultDate && props.initialDate === undefined) {
      const dateF = new Date()
      const day = dateF.getDate()
      const monthIndex = dateF.getMonth()
      const year = dateF.getFullYear()

      const month = monthIndex + 1
      setAddMonth('0' + month.toString())
      setAddDay(day.toString())
      setAddYear(year.toString())
      props.getDate(
        `${'0' + month.toString()}/${day.toString()}/${year.toString()}`
      )
    } else if (props.initialDate !== null) {
      let newInitialDate = new Date(formatDate(props.initialDate, false, true))
      let newDay = newInitialDate.getDate().toString()
      if (newDay.length === 1) {
        newDay = `0${newDay}`
      }

      setAddMonth('0' + (newInitialDate.getMonth() + 1).toString())
      setAddDay(newDay)
      setAddYear(newInitialDate.getFullYear().toString())
      props.getDate(formatDate(props.initialDate, false, true))
    }
  }, [])

  function handleDates(event) {
    const newDate = event.target.value
    if (event.target.id === 'addMonth') {
      setAddMonth(newDate)
      setDaysLength(calculateDays(newDate, addYear))
      props.getDate(`${newDate}/${addDay}/${addYear}`)
    } else if (event.target.id === 'addDay') {
      setAddDay(newDate)
      props.getDate(`${addMonth}/${newDate}/${addYear}`)
    } else if (event.target.id === 'addYear') {
      setAddYear(newDate)
      setDaysLength(calculateDays(addMonth, newDate))
      props.getDate(`${addMonth}/${addDay}/${newDate}`)
    }
  }

  return (
    <React.Fragment>
      <Form.Row controlId="selectCategory">
        <Form.Group
          as={Col}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Control
            id="addMonth"
            style={{ width: '80px' }}
            as="select"
            name="month"
            value={addMonth}
            onChange={handleDates}
          >
            <option value="">MM</option>
            {[
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
            ].map((month) => {
              return (
                <option
                  value={`${month}`}
                  key={Number(month)}
                >{`${month}`}</option>
              )
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group
          as={Col}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Control
            id="addDay"
            style={{ width: '75px' }}
            as="select"
            name="day"
            value={addDay}
            onChange={handleDates}
          >
            <option value="">DD</option>
            {[
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
            ]
              .filter((numberOfDays) => {
                return Number(numberOfDays) <= daysSelected
              })
              .map((day) => {
                return (
                  <option
                    value={`${day}`}
                    key={`day-${Number(day)}`}
                  >{`${day}`}</option>
                )
              })}
          </Form.Control>
          {/* <Form.Label style={{ color: "red" }}>
            {errors.day && "Day is required."}
          </Form.Label> */}
        </Form.Group>

        <Form.Group
          as={Col}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Control
            id="addYear"
            style={{ width: '100px' }}
            as="select"
            name="year"
            value={addYear}
            onChange={handleDates}
          >
            <option value="">YYYY</option>
            {years.map((everyYear, index) => {
              const keyIndex = index
              return (
                <option key={`everyYear-${keyIndex}`} value={everyYear}>
                  {everyYear}
                </option>
              )
            })}
          </Form.Control>
          {/* <Form.Label style={{ color: "red" }}>
            {errors.year && "Year is required."}
          </Form.Label> */}
          <br></br>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group
          as={Col}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Label style={{ fontWeight: 'bold' }}>Month</Form.Label>
        </Form.Group>
        <Form.Group
          as={Col}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Label style={{ fontWeight: 'bold' }}>Day</Form.Label>
        </Form.Group>
        <Form.Group
          as={Col}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Label style={{ fontWeight: 'bold' }}>Year</Form.Label>
        </Form.Group>
      </Form.Row>
    </React.Fragment>
  )
}
