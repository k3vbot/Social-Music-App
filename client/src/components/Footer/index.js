import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Card from 'react-bootstrap/Card';
const Player = () => (
    <Card body outline color="success" className="mx-auto my-5" style={{ width: '100rem' }}>
        <AudioPlayer
            autoPlay
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            onPlay={e => console.log("onPlay")}
        // other props here
        />
    </Card>

);

export default Player;
