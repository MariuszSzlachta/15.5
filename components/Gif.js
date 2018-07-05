var GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';
var styles = {
  minHeight: '310px',
  margin: '0.5em'
};

Gif = React.createClass({
	getUrl: function() {
    // funkcja pobiera adres do linku jeśli został przekazany w propsach to go ustawia, jeśli nie to ustawia adres do loadera
		return this.props.sourceUrl || GIPHY_LOADING_URL;
	},
	render: function() {
    // jeśli props przekazany jako loading jest false to ustaw adres this.props.url, jeśli nie to kółko 
		var url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;

		return (
			<div style={styles}>
				<a href={this.getUrl()} title='view this giphy' target='new'>
					<img id='gif' src={url} style={{width: '100%', maxWidth: '350px'}}/>
				</a>
			</div>
		);
	}
});