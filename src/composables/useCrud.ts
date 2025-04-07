import { ref } from 'vue';
import axios from 'axios';

// Define the Item type
interface Item {
  id: number;
  name: string;
}

interface CrudResponse<T> {
  data: T;
}

export default function useCrud(apiUrl: string) {
  const items = ref<Item[]>([]);
  const item = ref<Item | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const token = localStorage.getItem('auth_token') as string | null;

  // Fetch all items
  const read = async <T>(): Promise<T | undefined> => {
    isLoading.value = true;
    error.value = null;
  
    try {
      const response = await axios.get<T>(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data; // Let the caller handle the data shape
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  
    return undefined;
  };
  

  // Fetch a single item by ID
  const single = async (id: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get<CrudResponse<Item>>(`${apiUrl}/${id}`);
      item.value = response.data.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  // Create a new item
  const create = async <T>(newItem: T | FormData): Promise<T | undefined> => {
    isLoading.value = true;
    error.value = null;
  
    try {
      // Set up the request configuration
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': newItem instanceof FormData ? 'multipart/form-data' : 'application/json',
        },
      };
  
      // Send the request
      const response = await axios.post<CrudResponse<T>>(apiUrl, newItem, config);
  
      return response.data.data; // Return the created item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      return undefined;
    } finally {
      isLoading.value = false;
    }
  };
  


  // Update an item
  const update = async (id: number, updatedItem: Item) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.put<CrudResponse<Item>>(`${apiUrl}/${id}`, updatedItem);
      const index = items.value.findIndex(item => item.id === id);
      if (index !== -1) {
        items.value[index] = response.data.data;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  // Delete an item
  const destroy = async (id: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      items.value = items.value.filter(item => item.id !== id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    items,
    item,
    isLoading,
    error,
    read,
    single,
    create,
    update,
    destroy,
  };
}
