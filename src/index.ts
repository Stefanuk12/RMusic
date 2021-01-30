// Dependencies
import got from "got/dist/source";
import { IRMusicAudio } from "./interfaces/IRMusicAudio";

export class RMusic {
    // Vars
    MusicTable: Array<IRMusicAudio> = [];
    removedAssets: Array<string> = [
        "https://images.rbxcdn.com/9281912c23312bc0d08ab750afa588cc.png",
        "https://t6.rbxcdn.com/70608418c648be7ac4e323e3294bb059",
        "https://t5.rbxcdn.com/d28c1b5eed271a7aa76f16689e74ca04"
    ];


    // Filter that checks through the audios
    private checkFilter(webSource: string){
        for (const removedAsset of this.removedAssets){
            if (webSource.includes(removedAsset)){
                return false;
            }
        }

        return true;
    }

    // Check if audios are still valid
    async check(audio: IRMusicAudio, filter: Function = this.checkFilter){
        try {
            // Get webpage source
            const webSource = await got.get(`https://roblox.com/library/${audio.id}`, {
                throwHttpErrors: false
            });
            
            // 404
            if (webSource.statusCode == 404){
                throw(new Error("Audio does not exist."))
            }

            // Checking if it has been removed then returning
            const success = filter(webSource.body);
            if (success == false){
                throw(new Error("Audio failed."))
            }
        } catch(error) {
            // Throw Error
            throw (error);
        }
    }

    // Add Audio to table
    async add(audio: IRMusicAudio, checkAudio: boolean = false, filter: Function = this.checkFilter, musicTable: Array<IRMusicAudio> = this.MusicTable){
        // Check if the audio is alive
        if (checkAudio){
            try {
                await this.check(audio);
                musicTable.push(audio);
                return;
            } catch(err) {
                throw(err);
            }
        }

        //
        musicTable.push(audio);
    }

    // Find an audio
    find(audio: IRMusicAudio, musicTable: Array<IRMusicAudio> = this.MusicTable){
        for (const _audio of musicTable){
            if (_audio.id == audio.id){
                return true;
            }
        }

        return false;
    }

    // Remove audio from table
    remove(audio: IRMusicAudio, musicTable: Array<IRMusicAudio> = this.MusicTable){
        for (var i = 0; i < musicTable.length; i++){
            const _audio = musicTable[i];

            if (audio == _audio){
                musicTable.splice(i, 1);
            }
        }
    }

    // Remove duplicates from table
    removeDuplicates(musicTable: Array<IRMusicAudio> = this.MusicTable){
        var cleanArray: Array<IRMusicAudio> = [];

        for (const audio of musicTable){
            if (!this.find(audio, cleanArray)){
                cleanArray.push(audio);
            }
        }

        return cleanArray;
    }

    // Alphabetically sort the table
    alphabetSort(musicTable: Array<IRMusicAudio> = this.MusicTable){
        return musicTable.sort((a, b) => {
            if (a.name && b.name){
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
            }

            return 0;
        })
    }

    // Check entire music table
    async checkAll(musicTable: Array<IRMusicAudio> = this.MusicTable){
        var cleanArray: Array<IRMusicAudio> = [];

        for (const audio of musicTable){
            try {
                await this.check(audio);
                cleanArray.push(audio);
                return;
            } catch(err) {}
        }

        return cleanArray;
    }
}