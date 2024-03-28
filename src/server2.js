import { createServer, IncomingMessage, ServerResponse } from 'node:http'

import { SERVER2_PORT } from './config.js'


/**
 * @param {IncomingMessage} request 
 * @param {ServerResponse} response 
 */
async function requestListener (request, response) {
  if (request.method === 'POST' && request.url.includes('cart')) {
    for await (const data of request) {
      const item = JSON.parse(data)
      return response.end(`Process succeed for ${item.id}`)
    }
  }
  return response.end('Hello, World!')
}


createServer(requestListener)
  .listen(SERVER2_PORT, () => console.log(`Cart API is running at ${SERVER2_PORT}`))