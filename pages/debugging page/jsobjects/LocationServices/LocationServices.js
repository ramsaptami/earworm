export default {

	clearLocationWatch: () => {
		if (appsmith.geolocation.currentPosition != null) {
			appsmith.geolocation.clearWatch()
		}
	},
	
	locationSpotter: () => {
	//set to run on page load
		return appsmith.geolocation.getCurrentPosition()
		.then(() => {
				showModal("showUserLocation")
				return appsmith.geolocation.currentPosition
				locationSong.play()
		})
		.catch (() => showAlert("Failed to spot you on the map", 'error'))
	},
	
	sendMeYourLocation: () => {
	//!needs user confirmation before running
		return locationPermissionSwitch.isSwitchedOn ? this.locationSpotter() : this.clearLocationWatch()
	}
}