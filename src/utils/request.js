import axios from 'axios'

const require = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api'
})

export default require
