// stores/react.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReactStore = defineStore('react', () => {
  const likes = ref(false)
  const dislikes = ref(false)

  const toggleLike = () => {
    likes.value = !likes.value
    if (likes.value) {
      dislikes.value = false // Disabling dislike when like is active
    }
  }

  const toggleDislike = () => {
    dislikes.value = !dislikes.value
    if (dislikes.value) {
      likes.value = false // Disabling like when dislike is active
    }
  }

  const setLikeState = (val: boolean) => {
    likes.value = val
    if (val) dislikes.value = false
  }

  const setDislikeState = (val: boolean) => {
    dislikes.value = val
    if (val) likes.value = false
  }

  return {
    likes,
    dislikes,
    toggleLike,
    toggleDislike,
    setLikeState,
    setDislikeState
  }
})
