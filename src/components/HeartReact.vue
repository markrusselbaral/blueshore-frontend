<script setup lang="ts">
import { ref, watch, onMounted  } from 'vue'
import gsap from 'gsap'
import { useReactStore } from '@/stores/react'

const reactStore = useReactStore()
const heart = ref<SVGSVGElement | null>(null)
const heartFly = ref<SVGSVGElement | null>(null)
const isLike = ref(false)

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  user_likes: {
    type: Boolean,
    required: true
  },
})

const emit = defineEmits(['like', 'refresh'])

const toggleLike = () => {
  const newState = !reactStore.likes
  reactStore.setLikeState(newState)
  isLike.value = newState

  emit('like', props.id)
}


onMounted(() => {
  reactStore.likes = props.user_likes;
});


watch(() => reactStore.likes, (newVal) => {
  isLike.value = newVal
  if (heart.value) {
    if (newVal) {
      gsap.to(heart.value, {
        scale: 1.1,
        fill: "red",
        stroke: "red",
        duration: 0.3,
        filter: "drop-shadow(0 0 5px rgba(255, 0, 0, 0.5))",
        ease: "power2.out",
        onComplete: () => {
          gsap.to(heart.value, {
            scale: 1,
            duration: 0.2,
            filter: "drop-shadow(0 0 0px rgba(255, 0, 0, 0))",
            ease: "power2.in",
          })
        }
      })

      gsap.set(heartFly.value, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0
      })
  
      const randomX = (Math.random() * 100) - 50
      const randomRotate = (Math.random() * 60) - 30
      const randomDuration = 0.8 + Math.random() * 0.4
  
      gsap.to(heartFly.value, {
          y: -100,
          x: randomX,
          rotation: randomRotate,
          opacity: 0,
          duration: randomDuration,
          ease: "power1.out",
          onComplete: () => {
              gsap.set(heartFly.value, { opacity: 0 })
          }
      })
    } else {
      gsap.to(heart.value, {
        scale: 0.8,
        fill: "#162637",
        stroke: "currentColor",
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(heart.value, {
            scale: 1,
            duration: 0.1,
            ease: "power2.in"
          })
        }
      })
    }
  }
})
</script>



<template>
    <div class="heart-container" @click="toggleLike()">
      <svg
        fill="#162637"
        ref="heart"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="heart-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <svg
        fill="red"
        ref="heartFly"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="red"
        class="fly-heart"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  </template>
  
  
  <style scoped>
  .heart-container {
    position: relative;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  .heart-icon {
    width: 100%;
    height: 100%;
    color: #162637;
    transition: all 0.3s ease;
  }
  
  .fly-heart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
  }
  </style>