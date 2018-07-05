App = React.createClass({
	getInitialState() {
		// ustawienie stanu:
		// loading false - nic nie ładujemy
		// searchingText - nic nie pobraliśmy z komponentu search
		// gif - w związku z tym git to pusty obiekt
		return {
			loading: false,
			searchingText: '',
			gif: {}
		}
	},
	
	handleSearch: function(searchingText) {
		// obsługuje komunikację z inputem w komponencie search
		// stan na true bo jak uruchomiliśmy funkcję, to wiadomo, że coś pobieramy
		this.setState({
			loading: true
		});
		// na podstawie textu pobranego z inputa 
		// po pobraniu obiektu z api ustawia loadingf na false, bo już pobrało, this.state.git na ten gif z funkcji anonimowej
		this.getGif(searchingText)
			//wykorzystuje odpowiedź, którą resolved do ustawienia stanu komponentu, zmieniając stan renderuje komponent na nowo
			.then(gif => {
				this.setState({
					loading: false,
					gif: gif,
					searchingText: searchingText
				});
			})
			.catch(error => console.log(`Error occurred ${error}`))
	},
	
	getGif: function(searchingText) {
		return new Promise ( (resolve, reject) => {

			const GIPHY_PUB_KEY = 'qYJUoExqhocza5OQXzJpzFgXT2AxuaGW';
			const GIPHY_API_URL = 'https://api.giphy.com';

			const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;

			const xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			
			xhr.onload = () => {
				if (xhr.status === 200) {
					const data = JSON.parse(xhr.responseText).data;
					const gif = {
						url: data.fixed_width_downsampled_url,
						sourceUrl: data.url
					}
					//wyrzucam odpowiedź czyli stworzonego gifa
					resolve(gif);
				} else {
					reject(new Error(this.statusText));
				}
			}
			xhr.onerror = () => {
				reject(new Error(`Gif's not found ${this.statusText}`))
			};
			xhr.send();
		})
	},

	render: function() {

		var styles = {
			margin: '0 auto',
			textAligin: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Wyszukiwarka GIFów</h1>
				<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif 
				loading={this.state.loading}
				url={this.state.gif.url}
				sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});