export default {
	//artist: searchArtist.text ?? selectArtist.selectedOptionLabel,

	artistSearch: () => {
		spotifySearch.run(() => { 
			storeValue('artistId', spotifySearch.data.albums.items[0].artists[0].id)
			fetchAlbums.run()
				.then(() => { 
				this.fetchArtistTopTracks(spotifySearch.data.artists.items[0].id)}) }, 
											() => showAlert('Unable to fetch artist ID','warning'))
	},


	fetchArtistAlbums: () => {
		const albums = fetchAlbums.data.items.map((item) => ({
			label:item.name , value: item.id
		}))
		return _.filter(albums)
	},

	fetchArtistTracks: () => {
		let tracks = fetchAlbumTracks.data.items.map((item) => ({
			label: item.name, value:item.external_urls.spotify
		}))
		return _.uniq(tracks)
	},

	fetchArtistTopTracks: (artist) => {
		storeValue('artist', artist)
			.then(() => {
			console.log('stored artist code and now trying to run spotify API')	
			return fetchTopTracks.run(
				() => {	youTubeCustomSearch.run(); console.log('ran Spotify fetchTopTracks query') },
				() => { showAlert('Uh uh! :( Looks like auth token has expired','warning'), console.log('cannot process artist') })
		})
			.catch(() => console.log('failure'))
	},

	mapAlbums: function () {
	fetchAlbumTracks.data.items.map(item => ({ name: item.name, external_urls: item.external_urls }))
	}
}