import { Message } from '../models'

export function serializer(data: Message<any>) {
  return JSON.stringify(data)
}

export function deserialize(data: string) {
  return JSON.parse(data)
}
