import axios from 'axios'


const CART_URL = 'http://localhost:4000/cart'
const PRODUCTS_URL = 'http://localhost:3000/products'


async function db () {
  return Array.from({ length: 1000 }, (v, index) => `${index}-cellphone`)
}


async function processDbData () {
  const products = await db()
  const responses = []
  for (const product of products) {
    const { data: productsData } = await axios.get(`${PRODUCTS_URL}?productName=${product}`)
    const { data: cartData } = await axios.post(`${CART_URL}`, productsData)
    responses.push(cartData)
  }
  return responses
}


async function* processDbDataGenerator () {
  const products = await db()
  for (const product of products) {
    const { data: productsData } = await axios.get(`${PRODUCTS_URL}?productName=${product}`)
    const { data: cartData } = await axios.post(`${CART_URL}`, productsData)
    yield cartData
  }
}


// console.table(await processDbData())

for await (const data of processDbDataGenerator()) {
  console.table(data)
}