import Task from 'data.task'
import { compose, map, identity } from 'ramda'

export const get = http =>
  http.get('http://localhost:8080/items/')

export const getTask = http =>
  new Task((rej, res) => get(http).then(res, rej))

export const getCollectionTask =
  compose(map(identity(dto => JSON.parse(dto.response))), getTask)