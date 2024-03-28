import { randomUUID } from 'node:crypto'
import { createServer, IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'

import { SERVER1_PORT } from './config.js'


/**
 * @param {IncomingMessage} request 
 * @param {ServerResponse} response 
 */
async function requestListener (request, response) {
  if (request.method === 'GET' && request.url.includes('products')) {
    const { query: { productName } } = parse(request.url, true)
    const result = {
      id: randomUUID(),
      product: productName
    }
    return response.end(JSON.stringify(result))
  }
  return response.end('Hello, World!')
}


createServer(requestListener)
  .listen(SERVER1_PORT, () => console.log(`Products API is running at ${SERVER1_PORT}`))