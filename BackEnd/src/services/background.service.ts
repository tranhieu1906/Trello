import { Background } from "../models/Background";

class BackgroundService {
    async getList() {
         let BackgroundList = await Background.find()
        return BackgroundList
    }

    async add(req) {
        let newBackground = new Background({
            img: req.body.img,
        })
        await newBackground.save()
        return newBackground
    }

}

export default new BackgroundService();