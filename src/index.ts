// Dependencies
import got from "got/dist/source";
import { IRMusicAudio } from "./interfaces/audio";

export class RMusic {
    // Vars
    static removedAssets: Array<string> = [
        "https://images.rbxcdn.com/9281912c23312bc0d08ab750afa588cc.png",
        "https://t6.rbxcdn.com/70608418c648be7ac4e323e3294bb059",
        "https://t5.rbxcdn.com/d28c1b5eed271a7aa76f16689e74ca04"
    ];


    // Check if an audio has been removed or not - returns an error if it has, else returns nothing
    private checkFilter(webSource: string){
        for (const removedAsset of RMusic.removedAssets){
            if (webSource.includes(removedAsset)){
                return false;
            }
        }

        return true;
    }
    async check(audio: IRMusicAudio, xcsrftoken: string = "", filter: Function = this.checkFilter){
        try {
            // Get webpage source
            const webSource = await got.get(`https://roblox.com/library/${audio.id}`, {
                throwHttpErrors: false,
                headers: {
                    "x-csrf-token": xcsrftoken
                }
            });
            
            // 404
            if (webSource.statusCode == 404){
                throw(new Error("Audio does not exist"))
            }

            // Checking if it has been removed then returning
            const success = filter(webSource.body);
            if (success == false){
                throw(new Error("Audio failed"))
            }
        } catch(error) {
            // Return
            return error;
        }
    }
}