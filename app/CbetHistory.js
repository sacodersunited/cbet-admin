import { createBrowserHistory } from 'history'

let baseNameProd = ''

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
  baseNameProd = ''
} else {
  // For staging: "/civiliancorpsadmindev"
  // For Prod: "/civcorpsadmin"
  console.log('Production basename is https://cbet.edu/admin')
  baseNameProd = 'https://cbet.edu/admin'
}

const customHistory = createBrowserHistory({
  basename: baseNameProd,
})

export default customHistory
