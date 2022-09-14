import { StyleSheet } from "react-native"

export const commonStyles = StyleSheet.create({
	displayText: {
		color: 'rgba(255, 255, 255, 0.75)',
		fontSize: 25,
		marginVertical: 5
	},
})

export const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	backgroundImage: {
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	titleText: {
		...commonStyles.displayText,
		textAlign: 'center',
		fontSize: 48,
		marginTop: "20%"
	},
	textInput: {
		borderBottomWidth: 3,
		color: 'rgba(0, 0, 0, 0.4)',
		padding: 5,
		paddingLeft: 10,
		paddingVertical: 15,
		marginVertical: 50,
		marginHorizontal: 15,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		fontSize: 20,
		borderBottomColor: 'rgba(0, 255, 255, 0.6)'
	},
	infoView: {
		alignItems: 'center'
	},
	locationText: {
		...commonStyles.displayText,
		fontSize: 48,
		fontWeight: 'bold',
		marginVertical: 0
	},
	temperatureText: {
		...commonStyles.displayText,
		fontSize: 55,
	},
})