// Dependencies
import { RMusic } from "../src/index" // import { RMusic } from "rmusic"

// RMusic
const _RMusic = new RMusic();

// Checking
(async () => {
    const soundId = 6098149765;
    var soundCheck = await _RMusic.check({id: soundId});

    console.log(soundCheck);
})()