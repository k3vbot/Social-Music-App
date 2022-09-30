import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = () => (
    <AudioPlayer
        className="mx-auto my-5"
        style={{ width: '100rem' }}
        autoPlayAfterSrcChange
        // autoPlay
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        onPlay={e => console.log("onPlay")}
    // other props here
    />
);

export default Player;
