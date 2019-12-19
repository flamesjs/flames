export enum MessageType {
  message = 'MESSAGE',
  join = 'JOIN',
  leave = 'LEAVE',
  connected = 'CONNECTED',
  error = 'ERROR',
  info = 'INFO'
}

/**
 * Base structures
 */
export interface BaseMessage<T = any> {
  type: MessageType
}

export interface BaseMessageMetadata {
}

/**
 * Implementations
 */

// Message
export interface RoomMessage<T> extends BaseMessage<T> {
  type: MessageType.join | MessageType.leave
  meta: RoomMetadata
}

export interface PayloadMessage<T> extends BaseMessage<T> {
  type: MessageType.message
  payload: T
}

export interface ErrorMessage<T> extends BaseMessage<T> {
  type: MessageType.error
  meta: ErrorMetadata
}

export interface ConnectedMessage<T> extends BaseMessage<T> {
  type: MessageType.connected
}

export interface InfoMessage<T> extends BaseMessage<T> {
  type: MessageType.info
  meta: InfoMetadata
}

export type Message<T> = RoomMessage<T> | PayloadMessage<T> | ConnectedMessage<T> | ErrorMessage<T> | InfoMessage<T>

// Metadata
export interface RoomMetadata extends BaseMessageMetadata {
  roomName: string
}

export interface ErrorMetadata extends BaseMessageMetadata {
  error: MessageNotify
}

export interface InfoMetadata extends BaseMessageMetadata {
  info: MessageNotify
}

export interface MessageNotify {
  type: 'error' | 'info'
  // TODO: Add error codes
  code: number
  message: string
}

export type MessageMetadata = RoomMetadata | ErrorMetadata | InfoMetadata

export enum FlameEvent {
  message = 'message',
  close = 'close'
}
