import { FlamesServer } from './flames-server'
import { MessageType } from './models'

const server = new FlamesServer({
  port: 8000,
  opening: () => onOpen()
})

function onOpen() {
  console.log(`Websocket is listening on http://localhost:8000`)
}

setTimeout(() => {
  server.emit(MessageType.message, {
    age: 19,
    name: 'Sam'
  })
}, 5000)
