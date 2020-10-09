import axios from 'axios';


export default axios.create({
  headers: {
    'Authorization': `Token ${localStorage.getItem('token')}`
  }
})
