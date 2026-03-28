import axios from "axios";

//WE COMMUNICATE WITH THE SERVER THROUGH THIS CODES

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    return response.data;
  })
}

const create = (person) => {
  const request = axios.post(baseUrl, person);
  return request.then(response => {
    return response.data;
  })
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const update = (id, info) => {
  const request = axios.put(`${baseUrl}/${id}`, info)
  return request.then(response => response.data);
}

export default { getAll, create, remove, update };