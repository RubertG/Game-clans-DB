// bloquear a las personas que no tienen token
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class Segurity {
  public verifyToken(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        const secretKey = String(process.env.SECRET_PASSWORD)
        const token = req.headers.authorization.split(" ")[1] as string
        const dataUser = jwt.verify(token, secretKey)
        req.body.user = dataUser
        next()
      } catch (error: any) {
        res.status(401).json({
          response: "Token not is correct.",
          error: error.message
        })
      }
    } else {
      res.status(401).json({ response: "Token corrupt." })
    }
  }
}

const segurity = new Segurity()
export default segurity