/* eslint-disable */
import React from 'react';
import './Player.css';
import { GrPrevious, GrNext, GrPlayFill, GrPauseFill } from 'react-icons/gr';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = { nowPlaying: name };
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps.songName);
		console.log(this.props.songName);
		if (prevProps.songName !== this.state.nowPlaying.name) {
			console.log('calling');
			this.props.getCurrentPlay();
		}
	}

	render() {
		return (
			<div className="player-container ">
				<div className="img-container">
					<img src={this.props.albumArt} />
				</div>
				<h2 id="title">{this.props.songName}</h2>
				<h3 id="artist">{this.props.songArtist}</h3>
				<div className="progress-container" id="progress-container">
					<div className="progress" id="progress">
						<div className="duration-wrapper">
							<div className="progress__bar" />
						</div>
					</div>
				</div>
				<div className="player-controls">
					<GrPrevious onClick={this.props.skipToPrev} className="fas" />
					{this.props.isPlaying ? (
						<GrPauseFill onClick={this.props.pauseSong} className="fas main-button" />
					) : (
						<GrPlayFill onClick={this.props.playSong} className="fas main-button" />
					)}

					<GrNext onClick={this.props.skipToNext} className="fas" />
				</div>
			</div>
		);
	}
}
export default Player;
