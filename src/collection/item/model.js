import { Item } from './component.js'
import Task from 'data.task'
import { compose, map, identity } from 'ramda'
import { log } from "utilities"
//
//
// // ==== POST ==================================================================
// export const post = data =>
//   m.request( { method: "POST", url:'http://localhost:8080/items/add', data:data} )
//
// export const postTask = data =>
//   new Task((rej, res) => post(data).then(res, rej))
//
// export const toRequest = item => image =>{
//     let Dto =
//       { firstName: item.firstName
//       , lastName: item.lastName
//       , image: image
//       }
//     return Dto
//   }
//
// export const addTask = item =>
//   compose(postTask
//          , toRequest(item))

// ==== GET ==================================================================
export const getItem = http => id =>
  http.get(`http://localhost:8080/items/${id}`)

export const getTask = http => id =>
  new Task((rej, res) => getItem(http)(id).then(res, rej))

export const getItemTask =
  compose( map(map(identity(dto => JSON.parse(dto.response)))), getTask)
//
//
//   // ==== UPDATE ==================================================================
// export const update = id => data =>
//   m.request({method:'UPDATE', url:`http://localhost:8080/items/${id}`, data:data})
//
// export const editTask = data =>
//   new Task(update(data._id)(data))
//
//   // ==== DELETE ==================================================================
// export const remove = id =>
//   m.request({ method: 'DELETE', url:`http://localhost:8080/items/${id}`, data:{_id:id}} )
//
// export const removeTask = id =>
//   new Task((rej, res) => remove(id).then(res, rej) )
//
//
//   // ==== SAVE==================================================================
// export const saveData = isEditable => data =>
//   isEditable
//     ? editTask(data)
//     : addTask(data)(data.image)
//
// export const saveTask = isEditable =>
//   compose(saveData(isEditable))