<script lang="ts" setup>
import HeartReact from '@/components/HeartReact.vue'
import Card from '@/components/Card.vue'
import useCrud from '@/composables/useCrud'
import { onMounted, ref } from 'vue'
import type { AlbumResponse } from '@/types/album'
import Dislike from '@/components/Dislike.vue'
import useAuth from '@/composables/useAuth'

const { create: upvoteCreate } = useCrud('http://localhost:8000/api/upvote')
const { create: downvoteCreate } = useCrud('http://localhost:8000/api/downvote')
const { logout } = useAuth()

const { read } = useCrud('http://localhost:8000/api/album')
const albums = ref()

interface AlbumRequest {
  album_id: number
}

const displayAlbums = async () => {
  try {
    const response = await read<AlbumResponse>()
    if (response?.albums?.data) {
      albums.value = response.albums.data
    } else {
      console.error('No albums data available')
    }
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

const handleLike = async (id: number) => {
  try {
    await upvoteCreate<AlbumRequest>({ album_id: id })
  } catch (error) {
    console.error('Error liking album:', error)
  } finally {
    displayAlbums()
  }
}

const handleDislike = async (id: number) => {
  try {
    await downvoteCreate<AlbumRequest>({ album_id: id })
  } catch (error) {
    console.error('Error liking album:', error)
  } finally {
    displayAlbums()
  }
}

const handleLogout = () => {
  logout()
  window.location.href = '/login'
}

onMounted(() => {
  displayAlbums()
})
</script>

<template>
  <main>
    <b><a @click="handleLogout()" class="logout-link">Logout</a></b>
    <div class="header">
      <h1>My Music App</h1>
      <p>Welcome to my music app</p>
      <p>Here you can find your favorite albums</p>
    </div>
    <div class="container">
      <Card
        v-for="album in albums"
        :key="album.id"
        :song_name="album.song_name"
        :total_votes="album.total_votes"
      >
        <template v-slot:heart>
          <HeartReact
            :id="album.id"
            :user_likes="album.user_likes"
            @like="handleLike(album.id)"
            @dislike="handleLike(album.id)"
          />
        </template>
        <template v-slot:dislike>
          <Dislike
            :id="album.id"
            :user_dislikes="album.user_dislikes"
            @like="handleDislike(album.id)"
            @dislike="handleDislike(album.id)"
          />
        </template>
      </Card>
    </div>
  </main>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', Courier, monospace;
  color: white;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.logout-link {
  cursor: pointer;
  color: #fff;
  background-color: #2c3e50;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
}

.logout-link:hover {
  background-color: #0056b3; /* Darker shade on hover */
}
</style>
