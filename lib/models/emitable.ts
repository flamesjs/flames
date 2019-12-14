import { MessageType } from './messages'

export interface Emitable<T> {
  emit(type: MessageType, payload?: T): void
}
