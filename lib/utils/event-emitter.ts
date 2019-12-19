import { EventEmitter } from 'events'

export abstract class FlamesEventEmitter<T extends string | symbol> extends EventEmitter {
  public on<D>(event: T, listener: (payload?: D) => void): this {
    return super.on(event, listener)
  }

  public addListener<D>(event: T, listener: (payload?: D) => void): this {
    return super.addListener(event, listener)
  }

  public emit<D>(event: T, payload?: D) {
    return super.emit(event, payload)
  }

  public once<D>(event: T, listener: (payload?: D) => void): this {
    return super.once(event, listener)
  }

  public removeListener<D>(event: T, listener: (payload?: D) => void): this {
    return super.removeListener(event, listener)
  }

  public removeAllListeners(event?: T): this {
    return super.removeAllListeners(event)
  }

  public listeners(event: T) {
    return super.listeners(event)
  }

  public rawListeners(event: T) {
    return super.rawListeners(event)
  }

  public eventNames() {
    return super.eventNames() as T[]
  }
}
