const axios = require('axios')
const lunr = require('lunr')

let idx = null

export default function (text) {
  if (idx && !idx.then) {
    return text ? idx.search(text) : null
  } else if (!idx) {
    idx = axios.get('https://darosh.github.io/openapi-directory-lite/search/index.json').then(res => {
      idx = lunr.Index.load(res.data)
    })
  }

  return new Promise(resolve => {
    idx.then(() => {
      resolve(text ? idx.search(text) : null)
    })
  })
}
