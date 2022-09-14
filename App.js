import { StatusBar } from 'expo-status-bar'
import { useState, useCallback } from 'react'
import { StyleSheet, View, Text, TextInput, ImageBackground, ActivityIndicator} from 'react-native';
import {api, fetchFromApi} from './api'

export default function App() {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false)
	const [data, setData] =	useState([])

	const fetchWeatherData = useCallback(() => {
		console.log('fired')
		setInput("")

		fetchFromApi("/weather", {q : input, units: "metric"})
			.then(res => {
				console.log(res.data)
				setData(res.data)
			})
			.catch(error => console.dir(error))
			.finally(() => setLoading(false))
	}, [api.key, input])

	const render = function() {
		return (
			<View style = {styles.root}>
				<StatusBar style = 'light'/>
				<ImageBackground
					source = {require('./assets/background.jpg')}
					resizeMode = "cover"
					style = {styles.backgroundImage}
				>
					<Text style = {styles.titleText}>Weather?</Text>
					<TextInput
						placeholder = 'Enter a city or location name...'
						placeholderTextColor = 'rba(0, 0, 0, 0.8)'
						onChangeText = {text => setInput(text)}
						value = {input}
						style = {styles.textInput}
						onSubmitEditing = {fetchWeatherData}
					/>
					{loading && (<View><ActivityIndicator size = {'large'} color = 'rgba('/></View>)}
					{data.length != 0 && (
						<View style = {styles.infoView}>
							<Text style = {styles.locationText}>{`${data?.name}, ${data?.sys?.country}`}</Text>
							<Text style = {commonStyles.displayText}>{new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</Text>
							<Text style = {styles.temperatureText}>{`${Math.round(data?.main?.temp)} °C`}</Text>
							<Text style = {commonStyles.displayText}>{`Min: ${Math.round(data?.main?.temp_min)} °C / Max: ${Math.round(data?.main?.temp_max)} °C`}</Text>
						</View>
					)}
				</ImageBackground>
			</View>
		)
	}

	return render()
}

const commonStyles = StyleSheet.create({
	displayText: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 25,
		marginVertical: 5
	},
})

const styles = StyleSheet.create({
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
		color: 'rgba(0, 0, 0, 0.8)',
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