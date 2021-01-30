# RMusic
An "API" which will let you manage your roblox audios.

## Methods

### Base
These are the base methods, not relating to the music table ones

#### check
This method allows you to check if a certain audio has been removed.

Usage:
```
async check(audio: IRMusicAudio, filter: Function = this.checkFilter)
```

Example:
```ts
const _RMusic = new RMusic()
try {
    await _RMusic.check({id: 12345689});

    // Success
} catch(err){
    // Fail
}
```

### Music Table
These are the methods relating to the music table.

#### add
This method allows you to add an audio to the music table.

Usage:
```
add(audio: IRMusicAudio, checkAudio: boolean = false, filter: Function = this.checkFilter, musicTable: Array<IRMusicAudio> = this.MusicTable)
```

#### remove
This method allows you to remove an audio from the music table.

Usage:
```
remove(audio: IRMusicAudio, musicTable: Array<IRMusicAudio> = this.MusicTable)
```

#### find
This method allows you to find a certain audio in the music table.

Usage:
```
find(audio: IRMusicAudio, musicTable: Array<IRMusicAudio> = this.MusicTable)
```

#### removeDuplicates
This method allows you to remove any duplicate audio ids from the music table. Returns the sorted table.

Usage:
```
removeDuplicates(musicTable: Array<IRMusicAudio> = this.MusicTable)
```

#### alphabetSort
This method allows you to alphabetically sort the music table by their names. Returns the sorted table.

Usage:
```
alphabetSort(musicTable: Array<IRMusicAudio> = this.MusicTable)
```

#### checkAll
This method checks all of the audios in the music table. Returns the sorted table. **This may take a while.**

Usage:
```
async checkAll(musicTable: Array<IRMusicAudio> = this.MusicTable)
```