import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, ActivityIndicator} from 'react-native';
import axios, * as others from 'axios';

export default function App() {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false)
	const [data, setData] =	useState([])

	const api = {
		key: 'b8f097e453d7667ecdfaa15bbcb8ded3',
		baseUrl: 'http://api.openweathermap.org/data/2.5'
	}

	const fetchDataHandler = useCallback(() => {
		console.log('fired')
		setInput("")
		axios({
			method: "GET",
			url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
		})
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
				<StatusBar style = {styles.statusBar}/>
				<ImageBackground
					source = {require('./assets/background.jpg')}
					resizeMode = "cover"
					style = {styles.backgroundImage}
				>
					<View>
						<TextInput
							placeholder = 'Enter a city or location name...'
							placeholderTextColor = '#000000'
							onChangeText = {text => setInput(text)}
							value = {input}
							style = {styles.textInput}
							onSubmitEditing = {fetchDataHandler}
						/>
					</View>
					{loading && (
						<View>
							<ActivityIndicator size = {'large'} color = '#000000'/>
						</View>
					)}
					{data && (
						<View style = {styles.infoView}>
							<Text style = {styles.locationText}>
								{`${data?.name}, ${data?.sys?.country}`}
							</Text>
							<Text style = {styles.dateText}>{new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</Text>
							<Text style = {styles.temperatureText}>{`${Math.round(data?.main?.temp)} °C`}</Text>
							<Text style = {styles.minMaxTemperatureText}>{`Min: ${Math.round(data?.main?.temp_min)} °C / Max: ${Math.round(data?.main?.temp_max)} °C`}</Text>
						</View>
					)}
				</ImageBackground>
			</View>
		)
	}

	return render()
}

const styles = StyleSheet.create({
	statusBar: {
		color: '#ffffff'
	},
	root: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		flexDirection: 'column'
	},
	textInput: {
		borderBottomWidth: 3,
		padding: 5,
		paddingVertical: 20,
		marginVertical: 100,
		marginHorizontal: 10,
		backgroundColor: '#ffffff',
		fontSize: 19,
		borderRadius: 16,
		borderBottomColor: '#00ffff'
	},
	infoView: {
		alignItems: 'center'
	},
	locationText: {
		color: '#ffffff',
		fontSize: 40,
		fontWeight: 'bold'
	},
	dateText: {
		color: '#ffffff',
		fontSize: 22,
		marginVertical: 10
	},
	temperatureText: {
		fontSize: 45,
		color: '#ffffff',
		marginVertical: 10
	},
	minMaxTemperatureText: {
		fontSize: 22,
		color: '#ffffff',
		marginVertical: 10,
		fontWeight: '500'
	}
})