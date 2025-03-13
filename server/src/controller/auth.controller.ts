import { Request, Response } from 'express'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, confirmPassword } = req.body

    if (!username || !password || !confirmPassword) {
      res.status(400).json({
        error: 'Username, password, and confirm password are required',
      })
      return
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ error: 'Password must be at least 6 characters long' })
      return
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: 'Passwords do not match' })
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
    return
  } catch (error: any) {
    res.status(500).json({ error: error.message })
    return
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' })
      return
    }

    const user = await User.findOne({ username })
    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '7d',
      }
    )

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
    })

    res
      .status(200)
      .json({ message: 'Login successful', userId: user._id, token })
    return
  } catch (error: any) {
    res.status(500).json({ error: error.message })
    return
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('authToken')
  res.json({ message: 'Logged out successfully' })
}

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const token =
      req?.cookies?.authToken ||
      req?.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      res.status(401).json({ error: 'Unauthorized: No token provided' })
      return
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: string
    }

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' })
      return
    }

    res.status(200).json({ message: 'Authenticated', user })
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}
