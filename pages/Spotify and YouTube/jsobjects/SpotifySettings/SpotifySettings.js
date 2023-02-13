export default {

	//-----Calling requestToken API and saving authorization code to store-----//
	requestCall: async () => {
		try{
			console.log('STEP 2: Query param contains auth code so proceeding with request flow')

			const requestResponse = await requestToken.run()
			console.log("STEP 3: *REQUEST CALL* Successfully ran requestToken query ")

			let tokens = [
				storeValue('authToken', requestResponse.access_token),
				storeValue('refreshToken', requestResponse.refresh_token),
			]

			await Promise.all(tokens)

			console.log("Auth code in store is " + appsmith.store.authToken)
			console.log("Refresh token in store is " + appsmith.store.refreshToken)
		}	catch(err){ 
			console.log(err.message + " & returned a " + requestToken.responseMeta.statusCode)
			this.refreshCall()
		}
	},

	//-----Calling refreshToken and replacing auth code in store-----//
	refreshCall: async () => {
		try{
			appsmith.store.refreshToken ? 
				console.log("STEP 2: *REFRESH CALL* Code before refresh is \\n" + appsmith.store.authToken)
			: console.log('Refresh token has expired')

			const refreshResponse = await refreshToken.run()
			console.log("STEP 3: Trying to get auth code using refreshToken")

			storeValue('authToken', refreshResponse.access_token)

			await console.log("STEP 4: *REFRESH CALL* Code after refresh is \\n" + appsmith.store.authToken)
			console.log("Step 5: Going back to onPageLoad flow since app has been authorized. \\n Next is to run all Spotify API's")
		}catch(error){
			console.log(error.message + " & returned a " + refreshToken.responseMeta.statusCode)
		}
	}
}