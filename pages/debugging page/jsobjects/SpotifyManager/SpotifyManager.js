export default {
	filterResults: (data = SpotifySearch.data) => {
		let results = data
		
		//if(selectAlbum.selectedOptionLabel)
		
		return results	
	},
	
	mapingData: () => {
		return fetchAlbums.data.items.filter((albums) => {
			console.log(albums)
		})/*.map((item) => {
			return {label: item.album, value: item.album}
		})*/
	},
	fetchSongArtists: () => {
		if (fetchTopTracks.data != null) {
			
		}
	}
}