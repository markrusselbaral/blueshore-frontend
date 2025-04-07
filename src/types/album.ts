export type Album = {
    id: number;
    album_name: string | null;
    song_name: string;
    artist_name: string;
    album_cover: string;
    created_at: string | null;
    updated_at: string | null;
    total_votes: string | number;
  };
  
  export type AlbumPaginationLinks = {
    url: string | null;
    label: string;
    active: boolean;
  };
  
  export type AlbumResponse = {
    albums: {
      current_page: number;
      data: Album[]; // Array of Album objects
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: AlbumPaginationLinks[]; // Array of link objects
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  };
  