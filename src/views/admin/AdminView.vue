<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import HeartReact from '@/components/HeartReact.vue';
import Card from '@/components/Card.vue';
import useCrud from '@/composables/useCrud';
import type { AlbumResponse } from '@/types/album';

const { read, create } = useCrud('http://localhost:8000/api/album');
const albums = ref();
const showModal = ref(false);

const newAlbum = reactive({
  album_name: '',
  song_name: '',
  artist_name: '',
  album_cover: null as File | null,
});

const albumCoverPreview = ref<string | null>(null);



const displayAlbums = async () => {
  try {
    const response = await read<AlbumResponse>();
    if (response?.albums?.data) {
      albums.value = response.albums.data;
    } else {
      console.error('No albums data available');
    }
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

const submitAlbum = async () => {
  const formData = new FormData();
  formData.append('album_name', newAlbum.album_name);
  formData.append('song_name', newAlbum.song_name);
  formData.append('artist_name', newAlbum.artist_name);
  if (newAlbum.album_cover) {
    formData.append('album_cover', newAlbum.album_cover);
  }

  try {
    await create(formData);
    showModal.value = false;
    displayAlbums();
  } catch (error) {
    console.error('Error creating album:', error);
  }
};


const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    newAlbum.album_cover = file;
    albumCoverPreview.value = URL.createObjectURL(file);
  }
};
  
const deleteAlbum = (albumId: string) => {
    console.log('Delete album with ID', albumId);
}

onMounted(() => {
  displayAlbums();
});

</script>


<template>
  <main>
    <div class="header">
      <h1>My Music App</h1>
      <p>Welcome to my music app</p>
      <p>Here you can find your favorite albums</p>
      <button @click="showModal = true" class="add-btn">+ Add Album</button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>🎵 Add New Album</h2>

        <input v-model="newAlbum.album_name" placeholder="Album Name" />
        <input v-model="newAlbum.song_name" placeholder="Song Name" />
        <input v-model="newAlbum.artist_name" placeholder="Artist Name" />
        
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" @change="handleFileUpload" />

        <div v-if="albumCoverPreview" class="preview-container">
          <img :src="albumCoverPreview" alt="Album Cover Preview" class="cover-preview" />
        </div>

        <div class="modal-actions">
          <button @click="submitAlbum">Submit</button>
          <button @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>




    <!-- Table view -->
    <div class="table-wrapper">
  <table class="album-table">
    <thead>
      <tr>
        <th>Cover</th>
        <th>Album Name</th>
        <th>Song Name</th>
        <th>Artist</th>
        <th>Actions</th> <!-- Added Actions column -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="album in albums" :key="album.id">
        <td>
          <img :src="`http://localhost:8000/${album.album_cover || 'path/to/default/cover.jpg'}`" alt="Cover" class="table-cover" />
        </td>
        <td>{{ album.album_name }}</td>
        <td>{{ album.song_name }}</td>
        <td>{{ album.artist_name }}</td>
        <td>
          <!-- Delete button -->
          <button @click="deleteAlbum(album.id)" class="btn btn-delete">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
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
  margin-bottom: 2rem;
}

.add-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #38bdf8;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Modal styles */
/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #1e293b;
  padding: 2rem;
  border-radius: 1rem;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Courier New', Courier, monospace;
  animation: fadeIn 0.3s ease-in-out;
  color: white;
}

.modal h2 {
  color: aqua;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.modal input {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 2px solid #334155;
  background-color: #0f172a;
  color: white;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  outline: none;
}

.modal input:focus {
  border-color: aqua;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.modal-actions button {
  flex: 1;
  padding: 0.6rem 1rem;
  cursor: pointer;
  border: none;
  background-color: #38bdf8;
  color: white;
  font-weight: bold;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}

.modal-actions button:last-child {
  background-color: #64748b;
}

.modal-actions button:hover {
  background-color: #0ea5e9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.preview-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.cover-preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid aqua;
  animation: pop 0.3s ease-in-out;
}

@keyframes pop {
  from {
    transform: scale(0.8);
    opacity: 0.5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}




.table-wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding: 0 1rem;
  overflow-x: auto;
}

.album-table {
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  background-color: #2c3e50;
  border-radius: 0.5rem;
  overflow: hidden;
  color: white;
  font-family: 'Courier New', Courier, monospace;
}

.album-table thead {
  background-color: #1a252f;
}

.album-table th,
.album-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #44525f;
}

.album-table th {
  font-weight: bold;
  color: aqua;
  font-size: 0.9rem;
}

.album-table tbody tr:hover {
  background-color: #34495e;
}

.table-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}




</style>