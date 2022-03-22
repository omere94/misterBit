import { httpService } from './http.service'

export const reviewService = {
  add,
  query,
  // remove
}

function query(toyId) {
  console.log(toyId)
  return httpService.get('review', toyId)
}

// function remove(reviewId) {
//   return httpService.delete(`review/${reviewId}`)

// }
async function add(review) {
  const addedReview = await httpService.post(`review`, review)
  return addedReview
}

