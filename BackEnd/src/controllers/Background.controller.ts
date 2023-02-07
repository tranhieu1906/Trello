import BackgroundService from "../services/background.service";
class BackgroundController {
    async getBackground(req, res) {
        let data = await BackgroundService.getList()
        res.status(200).json(data)
    }

    async addBackground(req, res) {
        let data = await BackgroundService.add(req)
        res.status(200).json(data)
    }
}

export default new BackgroundController();