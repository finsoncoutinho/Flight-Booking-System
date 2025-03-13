import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token =
    req?.cookies?.authToken ||
    req?.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ error: 'Unauthorized request' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: string
    }
    ;(req as any).user = { userId: decoded.userId }
    next()
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' })
    return
  }
}
