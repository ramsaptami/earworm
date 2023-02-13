export default {
	authorizeSpotifyUsage: () => {
		console.log("Step 1: Calling SpotifyAuthOp after page load")
		return SpotifySettings.authTPP()
			.then(() => {
				console.log("Step 5: Coming back to onPageLoad flow - app has been authorized from nested calls. \\n Next is to run all Spotify API's")
				return RaceCondition.runAllSpotifyAPIs()	
			})
		.catch((error) => {
			showAlert("There's an issue connecting Spotify to your app 💔 \\n " + error.toString(), 'error')
			console.log("Abandoning all steps since something went wrong") })
	},
	
	playSomeMusic: () => {
		locationSong.autoPlay = true
	}
}