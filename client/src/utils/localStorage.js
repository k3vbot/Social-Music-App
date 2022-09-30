export const getSavedAlbumNames = () => {
    const savedAlbumNames = localStorage.getItem('saved_albums')
      ? JSON.parse(localStorage.getItem('saved_albums'))
      : [];
  
    return savedAlbumNames;
  };
  
  export const saveAlbumNames = (albumIdArr) => {
    if (albumIdArr.length) {
      localStorage.setItem('saved_albums', JSON.stringify(albumIdArr));
    } else {
      localStorage.removeItem('saved_albums');
    }
  };
  
  export const removeAlbumName = (albumName) => {
    const savedAlbumNames = localStorage.getItem('saved_albums')
      ? JSON.parse(localStorage.getItem('saved_albums'))
      : null;
  
    if (!savedAlbumNames) {
      return false;
    }
  
    const updatedSavedAlbumNames = savedAlbumNames?.filter((savedAlbumName) => savedAlbumName !== albumName);
    localStorage.setItem('saved_albums', JSON.stringify(updatedSavedAlbumNames));
  
    return true;
  };