export default {

	clearAuthCode: () => {
		storeValue('authToken', 'undefined')
		showAlert(appsmith.store.authToken)
	},
	
	displayStoredValues: () => {
		console.log(appsmith.store)
	}
}