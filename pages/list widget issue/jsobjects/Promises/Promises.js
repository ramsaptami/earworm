export default {
	artist: selectArtist.selectedOptionLabel,
	
	albums: () => {
		return fetchAlbums.run()
		.then(() => showAlert("Showing top tracks of " + this.artist))
		.catch(() => showAlert("Unable to show top tracks of " + this.artist))
	},
	
	albumTracks: () => {
		return fetchAlbumTracks.run()
		.then(() => showAlert("Showing albums of album tracks " + this.artist))
		.catch(() => showAlert("Unable to show album tracks of " + this.artist))
	},
	
	topTracks: () => {
		return Promise.resolve(() => fetchTopTracks.run() )
		.then(() => showAlert("Showing top tracks of " + this.artist))
		.catch(() => showAlert("Unable to show top tracks of  " + this.artist))
	}
}