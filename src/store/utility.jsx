import axios from 'axios';
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const authAxios = axios.create({
  headers: {
    'Authorization': `Token ${localStorage.getItem('token')}`
  }
})