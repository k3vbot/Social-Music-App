export const searchFmAlbums = (query) => {
    return fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=bd281961be037754fbda21762c200b85&format=json&limit=10`);
  };