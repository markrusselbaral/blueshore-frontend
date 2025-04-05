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

  // Fetch all items
  const fetchItems = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get<CrudResponse<Item[]>>(apiUrl);
      items.value = response.data.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch a single item by ID
  const fetchItem = async (id: number) => {
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
  const createItem = async (newItem: Item) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.post<CrudResponse<Item>>(apiUrl, newItem);
      items.value.push(response.data.data);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  // Update an item
  const updateItem = async (id: number, updatedItem: Item) => {
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
  const deleteItem = async (id: number) => {
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
    fetchItems,
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
  };
}
