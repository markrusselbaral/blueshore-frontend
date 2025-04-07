<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  song_name: {
    type: String,
    required: true
  },
  total_votes: {
    type: [String, Number] as PropType<string | number>,
    required: true
  }
})

</script>

<template>
  <div class="album">
    <div class="title">
      <div class="album-circle">
        <img src="@/assets/images/album.jpg" alt="album" />
      </div>
      <span class="album-name">{{ props.song_name }}</span>
    </div>
    <img class="album-cover" src="@/assets/images/album.jpg" alt="album" />
    <div class="actions">
      <button class="like-button">
        <!-- <HeartIcon class="heart-icon" /> -->
        <slot name="heart"></slot>
      </button>
      <span>{{ props.total_votes }}</span>
      <slot name="dislike"></slot>
    </div>
  </div>
</template>

<style scoped>
.album {
  width: 300px;
  height: 400px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  color: white;
  font-size: 20px;
  border-radius: 0.5rem;
  background-color: #2c3e50;
  padding: 10px;
}

.album-name {
  font-size: 1em;
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}

.album-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.album-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: aqua;
  overflow: hidden;
  animation: spin 3s linear infinite;
  flex-shrink: 0;
  border: 2px solid #fff;
}

.album-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
  font-size: 0.7em;
  color: #ccc;
  font-family: 'Courier New', Courier, monospace;
}

.actions button {
  background-color: transparent;
  border: none;
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
  font-family: 'Courier New', Courier, monospace;
}

.like-button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.heart-icon-solid {
  width: 24px;
  height: 24px;
  color: red;
}

.thumb-icon-solid {
  width: 24px;
  height: 24px;
  color: aqua;
}

.heart-icon {
  width: 24px;
  height: 24px;
  color: #162637;
}

.thumb-icon {
  width: 24px;
  height: 24px;
  color: #162637;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
