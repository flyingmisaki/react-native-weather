import { StatusBar } from 'expo-status-bar'
import { useState, useCallback } from 'react'
import { View, Text, TextInput, ImageBackground, ActivityIndicator} from 'react-native';
import { api, fetchFromApi } from './api'
import { commonStyles, styles } from './styles'

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
					{loading && (<View><ActivityIndicator size = {'large'} color = 'rgba(255, 255, 255, 0.8)'/></View>)}
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