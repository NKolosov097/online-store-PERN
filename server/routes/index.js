const Router = require('express')
const router = new Router()

const userRouter = require('./user.routes')
const typeRouter = require('./type.routes')
const brandRouter = require('./brand.routes')
const deviceRouter = require('./device.routes')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router
