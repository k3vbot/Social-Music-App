export const getSavedAlbumNames = () => {
  // go to localStorage, get the array with the key name saved_albums
  const savedAlbumNames = localStorage.getItem('saved_albums')
    ? JSON.parse(localStorage.getItem('saved_albums'))
    : [];

  return savedAlbumNames;
};

export const saveAlbumNames = (albumNameArr) => {
  if (albumNameArr.length) {
    localStorage.setItem('saved_albums', JSON.stringify(albumNameArr));
  } else {
    localStorage.removeItem('saved_albums');
  }
};

export const removeAlbumName = (AlbumName) => {
  const savedAlbumNames = localStorage.getItem('saved_albums')
    ? JSON.parse(localStorage.getItem('saved_albums'))
    : null;

  if (!savedAlbumNames) {
    return false;
  }

  const updatedSavedAlbumNames = savedAlbumNames?.filter((savedAlbumName) => savedAlbumName !== AlbumName);
  localStorage.setItem('saved_albums', JSON.stringify(updatedSavedAlbumNames));

  return true;
};