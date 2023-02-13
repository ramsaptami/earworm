export default {
	searchValue: searchArtist?.text?.length > 2 ? searchArtist.text : selectArtist.selectedOptionLabel,
	
	authTPP: async () => {
		console.log("STEP 2: Requesting either request or refresh token based on token validity");
		return this.requestCall()
		.then((s) => console.log(s))
		.catch((e) => {
			console.log(e.message)
			if(requestToken.responseMeta.statusCode != '200') {
				return this.refreshCall()
			}
		})
	},	
	
//-----Calling requestToken API and saving authorization code to store-----//
	requestCall: () => {
		console.log("STEP 3a: Attempting to run requestToken API query ")
		return requestToken.run()
		.then((response) => {
			console.log("STEP 4: *REQUEST CALL* Successfully ran requestToken API query ")
			let tokens = [
				storeValue('authToken', response.access_token),
				storeValue('refreshToken', response.refresh_token),
			]
				return Promise.all(tokens).then((resultTokens) => {	
					console.log("resultTokens", resultTokens)
					console.log("Auth code in store is " + appsmith.store.authToken)
					console.log("Refresh token in store is " + appsmith.store.refreshToken)
				})
				.catch((err) => { 
					console.log("Could not store tokens in store");
					return showAlert('Could not store tokens in store ' + err.toString());
				})
		})
	},
	
//-----Calling refreshToken and replacing auth code in store-----//
	refreshToken: () => {
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
		if (this.searchValue.length > 0) {
				showAlert(this.searchValue);
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