import axios from "axios"

export default axios.create({
  headers: {
    Authorization: `Token ${
      typeof window !== `undefined` && window.localStorage.getItem("token")
    }`,
  },
})
