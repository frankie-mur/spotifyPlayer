import React, { Component } from 'react';
import './App.css';
import Player from './player.component/Player';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
	constructor(props) {
		super(props);
		const params = this.getHashParams();
		const token = params.access_token;
		this.pauseSong = this.pauseSong.bind(this);
		this.playSong = this.playSong.bind(this);
		this.skipToNe = this.skipToNe.bind(this);
		this.skipToPrev = this.skipToPrev.bind(this);
		this.getCurrentPlay = this.getCurrentPlay.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);

		if (token) {
			spotifyApi.setAccessToken(token);
		}
		this.state = {
			loggedIn: token ? true : false,
			playing: false,
			progress_ms: 0,
			nowPlaying: {
				name: '',
				image: '',
				artist: '',
				duration: 0
			}
		};
	}
	componentDidMount() {
		this.getCurrentPlay();
	}

	//shouldComponentUpdate(nextProps, nextState) {
	//	if (this.state.nowPlaying.name !== nextState.songName) {
	//		console.log(this.state.nowPlaying.name);
	//		console.log(this.props.songName);
	//		console.log('true');
	//		return false;
	//	}
	//	return true;
	//	}

	componentDidUpdate() {}

	getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams;
	}

	getCurrentPlay() {
		spotifyApi.getMyCurrentPlayingTrack().then((response) => {
			this.setState({
				playing: response.is_playing,
				progress_ms: response.progress_ms,
				nowPlaying: {
					name: response.item.name,
					image: response.item.album.images[0].url,
					artist: response.item.artists[0].name,
					duration: response.item.duration_ms
				}
			});
		});
	}

	skipToNe() {
		spotifyApi.skipToNext().then((response) => {}).catch((error) => {
			console.log(error);
		});
	}
	skipToPrev() {
		spotifyApi.skipToPrevious().then((response) => {}).catch((error) => {
			console.log(error);
		});
	}

	playSong() {
		spotifyApi.play();
	}

	pauseSong() {
		spotifyApi.pause();
	}

	isLogged() {
		this.setState({ loggedIn: true });
	}

	render() {
		return (
			<div className="App">
				{this.state.loggedIn === false && (
					<a href="http://localhost:8888">
						<button onClick={() => this.isLogged()}>Log into Spotify</button>
					</a>
				)}

				<div>
					{this.state.loggedIn && (
						<Player
							className="player"
							songArtist={this.state.nowPlaying.artist}
							songName={this.state.nowPlaying.name}
							albumArt={this.state.nowPlaying.image}
							duration_ms={this.state.nowPlaying.duration_ms}
							isPlaying={this.state.playing}
							skipToNext={this.skipToNe}
							skipToPrev={this.skipToPrev}
							playSong={this.playSong}
							pauseSong={this.pauseSong}
							getCurrentPlay={this.getCurrentPlay}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default App;
