// Dependencies
import { RMusic } from "../src/index"

// RMusic
const _RMusic = new RMusic();

// Checking
(async () => {
    const soundId = 6098149765;
    var soundCheck = await _RMusic.check({id: soundId});

    console.log(soundCheck);
})()