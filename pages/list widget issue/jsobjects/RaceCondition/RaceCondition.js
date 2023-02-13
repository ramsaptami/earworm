export default {
	runAllSpotifyAPIs: () => {
		let funcToRun = [
			fetchAlbumTracks.run(),
			fetchTopTracks.run(),
			fetchAlbums.run() //accesses token directly from query, not store
			]
			return Promise.all(funcToRun)
				.then ( async () => {
					showAlert("You are now connected to Spotify 🎉")
					console.log("Step 6: All Spotify & YouTube API calls have been successfully executed")
					youTubeCustomSearch.run()
					await console.log("You're app is now ready to play some music 🎉")
				})
	},
	
	runGSheets: () => {
		return Promise.race([
			studioAlbumsFetchQuery.run(),
			promotionalSingles.run(),
			singlesFetchQuery.run()
		]).then((res) => {
			showAlert("Running GSheets queries"+ res.toString())
			.catch(() => {
				showAlert("Not running GSheets queries")
			})
		})
	},

	race: () => {
		return Promise.race([
			fetchAlbums.run(),
			fetchAlbumTracks.run(),
			fetchTopTracks.run(),
			searchAnyArtist.run()
		]).then((result) => showAlert(result.args))
			.catch((e) => showAlert('hello '+e.toString()))
	}
}