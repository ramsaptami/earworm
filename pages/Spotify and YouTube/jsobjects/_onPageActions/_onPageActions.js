export default {
	authorizeSpotifyUsage: async function () {
		try {		
			console.log("Step 1: Starting to authorize your app. \\n Checking for valid/available auth codes")
			console.log(appsmith.URL.queryParams.code ?? 'No auth code found in the URL' )		
			appsmith.URL.queryParams.code ? SpotifySettings.requestCall() : SpotifySettings.refreshCall()
			
			await this.runAllSpotifyAPIs()	
		} catch(error) {
			console.log("You'll need to authorize from the start")
			showAlert("App can't be authorized unless done from the home page")
		}
	},

	runAllSpotifyAPIs: () => {
		let funcToRun = [
			fetchAlbumTracks.run(),
			fetchTopTracks.run(),
			fetchAlbums.run()
		]
		return Promise.all(funcToRun)
			.then (async () => {
			showAlert("You are now connected to Spotify 🎉")
			console.log("Step 6: All Spotify & YouTube API calls have been successfully executed")
			youTubeCustomSearch.run()
			await console.log("Hope you're ready to listen to some music 🎉")
		})
	},

	race: () => {
		return Promise.race([
			fetchAlbums.run(),
			fetchAlbumTracks.run(),
			fetchTopTracks.run(),
			searchAnyArtist.run()
		]).then((result) => console.log(result.args))
			.catch((e) => showAlert('hello '+e.toString()))
	}
}