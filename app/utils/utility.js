const MonthDays = { FullMonth: 31, Thirty: 30, NonLeapYear: 28, LeapYear: 29 }
Object.freeze(MonthDays)

export function formatDate(date, withTime, withSlashes) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const dateF = new Date(date)
  const day = dateF.getDate()
  const monthIndex = dateF.getMonth()
  // console.log("##date in formatDAte", dateF, "monthIndex", monthIndex)
  const year = dateF.getFullYear()
  const time = dateF.toLocaleTimeString()
  if (withTime) return `${monthIndex + 1}/${day}/${year} ${time}`
  if (withSlashes) return `${monthIndex + 1}/${day}/${year}`
  return `${day} ${monthNames[monthIndex]} ${year}`
}

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

export const ToShortDate = (dt) => {
  var month_names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  var day = dt.getDate()
  var month_index = dt.getMonth()
  // var year = this.getFullYear()

  return month_names[month_index] + ' ' + day
}

export const ToStartDate = (dt) => {
  var month_names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  var day = dt.getDate()
  var month_index = dt.getMonth()
  var year = dt.getFullYear()

  return month_names[month_index] + ' ' + day + ', ' + year
}

// https://stackoverflow.com/questions/52583277/get-user-city-and-country-in-react-native
export const getLocationToAddress = (location) => {
  const locationToFind = `${location.latitude},${location.longitude}`
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationToFind}&sensor=true&key=${this.props.mapkey}`

  fetch(url)
    .then((resp) => resp.json())
    .then((result) => {
      const { results } = result

      if (results) {
        for (var ac = 0; ac < results[0].address_components.length; ac++) {
          var component = results[0].address_components[ac]

          switch (component.types[0]) {
            case 'locality':
              this.setState({
                city: component.long_name,
              })
              break
            case 'administrative_area_level_1':
              this.setState({
                state: component.long_name,
              })
              break
            case 'country':
              this.setState({
                country: component.long_name,
              })
              break
            default:
              break
          }
        }
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

export function isLeapYear(yearSelected) {
  const isLeapYearMade = yearSelected % 4 === 0
  const AndEvenDivisible = yearSelected % 100 !== 0
  const OrEvenDiv100 = yearSelected % 400 === 0

  console.log('isLeapYear', isLeapYearMade)

  const isItEvenLeapYear = (isLeapYearMade && AndEvenDivisible) || OrEvenDiv100
  return isItEvenLeapYear
}

export function calculateDays(month, yearSelected) {
  let daysArrayLength = 31

  if (month === '' || yearSelected === '') {
    return daysArrayLength
  }

  if (
    month === '01' ||
    month === '03' ||
    month === '05' ||
    month === '07' ||
    month === '08' ||
    month === '10' ||
    month === '12'
  ) {
    // these are 31 days
    daysArrayLength = MonthDays.FullMonth
  } else if (month === '02' && isLeapYear(yearSelected) === true) {
    daysArrayLength = MonthDays.LeapYear
  } else if (month === '02') {
    daysArrayLength = MonthDays.NonLeapYear
  } else if (
    month === '04' ||
    month === '06' ||
    month === '09' ||
    month === '11'
  ) {
    daysArrayLength = MonthDays.Thirty
  }

  return daysArrayLength
}
