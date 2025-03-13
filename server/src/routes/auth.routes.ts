import express from 'express'
import {
  register,
  login,
  logout,
  checkAuth,
} from '../controller/auth.controller'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/check-auth', checkAuth)

export default router
