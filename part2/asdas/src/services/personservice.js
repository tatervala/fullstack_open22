import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (nameobject) => {
  const request = axios.post(baseUrl,nameobject)
  return request.then(response => response.data)
}
const del = (id) => {
  const request = axios.delete(baseUrl+'/'+id.toString())
  return request.then(response => response.data)
}

const update = (newobject) => {
  const request = axios.put(baseUrl+`/`+newobject.id,newobject)
  return request.then(response => response.data)
}
export default {
  getAll: getAll,
  create: create,
  del: del,
  update: update
}