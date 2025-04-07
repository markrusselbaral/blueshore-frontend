<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { useReactStore } from '@/stores/react'

const reactStore = useReactStore()
const dislike = ref<SVGSVGElement | null>(null)
const dislikeFly = ref<SVGSVGElement | null>(null)
const isDislike = ref(false)

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  user_dislikes: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['dislike', 'refresh'])

const toggleLike = () => {
  const newState = !reactStore.dislikes
  reactStore.setDislikeState(newState)
  isDislike.value = newState

  emit('dislike', props.id)
}


onMounted(() => {
  reactStore.dislikes = props.user_dislikes;
})


// Watch for changes in the like state to trigger animations
watch(() => reactStore.dislikes, (newVal) => {
  isDislike.value = newVal
  if (dislike.value) {
    if (newVal) {
        console.log(newVal)
      gsap.to(dislike.value, {
        scale: 1.1,
        fill: 'aqua',
        stroke: 'aqua',
        duration: 0.3,
        filter: 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.5))',
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(dislike.value, {
            scale: 1,
            duration: 0.2,
            filter: 'drop-shadow(0 0 0px rgba(255, 0, 0, 0))',
            ease: 'power2.in',
          })
        },
      })

      gsap.set(dislikeFly.value, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
      })

      const randomX = Math.random() * 100 - 50
      const randomRotate = Math.random() * 60 - 30
      const randomDuration = 0.8 + Math.random() * 0.4

      gsap.to(dislikeFly.value, {
        y: 40,
        x: -randomX,
        rotation: randomRotate,
        opacity: 0,
        duration: randomDuration,
        ease: 'power1.out',
        onComplete: () => {
          gsap.set(dislikeFly.value, { opacity: 0 })
        },
      })
    } else {
        console.log('Dislike removed')
      gsap.to(dislike.value, {
        scale: 0.8,
        fill: 'none',
        stroke: 'currentColor',
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(dislike.value, {
            scale: 1,
            duration: 0.1,
            ease: 'power2.in',
          })
        },
      })
    }
  }
})
</script>

<template>
  <div class="dislike-container" @click="toggleLike()">
    <svg 
        fill="#162637" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="#162637" 
        class="dislike-icon"
        ref="dislike"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="aqua"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="aqua"
      class="fly-dislike"
      ref="dislikeFly"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
      />
    </svg>
  </div>
</template>

<style scoped>
.dislike-container {
  position: relative;
  width: 24px;
  height: 24px;
  margin-left: 8px;
  cursor: pointer;
}

.dislike-icon {
  width: 100%;
  height: 100%;
  color: #162637;
  transition: all 0.3s ease;
}

.fly-dislike {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
}
</style>
