export default {

	authTPP: () => {
		console.log("STEP 2: Requesting either request or refresh token based on token validity")
		console.log("STEP 3a: Attempting to run requestToken API query")
		return this.requestCall()
			.then((s) => console.log(s.message) )
			.catch((e) => {
			console.log(e.message)
			if(requestToken.responseMeta.statusCode != '200') {
				return this.refreshCall()
			}
		})
	},	

	//-----Calling requestToken API and saving authorization code to store-----//
	requestCall: () => {
		console.log("STEP 4: *REQUEST CALL* Successfully ran requestToken API query")
		return requestToken.run()
		let tokens = [
			storeValue('authToken', requestToken.data.access_token),
			storeValue('refreshToken', requestToken.data.refresh_token)
		]
		return Promise.all(tokens)
			.then(() => {	
			console.log("Auth code in store is " + appsmith.store.authToken)
			console.log("Refresh token in store is " + appsmith.store.refreshToken)
		})
			.catch((err) => {return showAlert('Could not store tokens in store ' + err.toString())})
	},

	//-----Calling refreshToken and replacing auth code in store-----//
	refreshCall: () => {
		console.log("STEP 3b: Attempting to run refreshToken API query")
		console.log("*REFRESH CALL* \\nAuth code before refresh is " + appsmith.store.authToken)
		return refreshToken.run()
			.then((refreshResponse) => {
			return storeValue('authToken', refreshResponse.access_token)
				.then(() => console.log("STEP 4: *REFRESH CALL* \\nAuth code after refresh is " + appsmith.store.authToken))
				.catch(() => console.log("Failed to update auth code from refresh call"))
		})
	},

	//-----Custom search artists on Spotify-----//
	runCustomSearch: async () => {
		const searchValue = (searchArtist?.text?.length > 2 ? searchArtist.text : selectArtist.selectedOptionLabel)
		if(searchValue.length > 0) {
			showAlert(searchValue);
			await searchAnyArtist.run()
			return searchAnyArtist.data.tracks
		}
		else {
			showAlert(appsmith.store.searchValue)
			await fetchTopTracks.run()
			return fetchTopTracks.data.tracks
		}
	},

	clearStorage: () => {
		Object.keys(appsmith.store).forEach((eachKey) => {
			storeValue(eachKey, undefined)	
			showAlert(eachKey)
		})
	},

	clearAuthCode: () => {
		storeValue('authToken', 'undefined')
		showAlert(appsmith.store.authToken)
	},

	//---test reactivity--//
	displaySearchText: () => {
		showAlert(this.searchValue)
	}
}