import { reviewService } from '../services/review.service'

export const reviewStore = {
    state: {
        reviews: []
    },
    getters: {
        reviews({reviews}) { return reviews },
    },
    mutations: {
        setReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        addReview(state, { review }) {
            state.reviews.push(review)
        },
        // removeReview(state, { reviewId }) {
        //     state.reviews = state.reviews.filter(review => review._id !== reviewId)
        // },
    },
    actions: {
        async addReview(context, { review }) {
            console.log(review)
            try {
                review = await reviewService.add(review)
                context.commit({ type: 'addReview', review })
                return review;
            } catch (err) {
                console.log('reviewStore: Error in addReview', err)
                throw err
            }
        },
        async loadReviews({commit}, {id}) {
            try {
                console.log('store id', id)
                const reviews = await reviewService.query(id);
                commit({ type: 'setReviews', reviews })

                }
                 catch (err) {
                console.log('reviewStore: Error in loadReviews', err)
                throw err
            }
        },
        // async removeReview(context, { reviewId }) {
        //     try {
        //         await reviewService.remove(reviewId);
        //         context.commit({ type: 'removeReview', reviewId })
        //     } catch (err) {
        //         console.log('reviewStore: Error in removeReview', err)
        //         throw err
        //     }
        // },

    }
}