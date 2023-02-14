const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/api.error')
const mv = require('mv');

class DeviceController {
    async create (req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            // mv(img, path.resolve(__dirname, '..', 'static', fileName))
            // mv(img, `../static/${fileName}`)
            // img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId }) // img: fileName

            if (info) {
                info = JSON.parse(info)
                info.forEach(element => {
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res, next) {
        try {
            let { brandId, typeId, limit, page } = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            let devices

            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset})
            }
            else if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
            }
            else if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
            }
            else if (brandId && typeId) {
                devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
            }
            return res.json(devices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
}

    async getOne (req, res) {
        const { id } = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })

        return res.json(device)
    }
}

module.exports = new DeviceController()
