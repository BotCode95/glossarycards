import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../../db'
import { generarJWT } from '@/utils/generar-jwt'
import User from '@/models/user'
import bcryptjs from 'bcryptjs';

type Data =| {message: string}  | {user: any, token: unknown}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	switch(req.method) {
	case 'POST':
		return login(req, res)
	default:
		return res.status(400).json({message: "Endpoint don't exists"})
	}
}

const login =  async (req: NextApiRequest, res:NextApiResponse<Data>) => {
    const {email, password} =req.body
    
    try {
        
        connect()
                const user = await User.findOne({email})
                if(!user){
                    return res.status(400).json({
                        message: 'Email / passsword incorrect'
                    })
                }
        
                if(!user.status){
                    return res.status(400).json({
                        message: 'User is with status deactivated'
                    })
                }
        
                const validPassword = bcryptjs.compareSync(password, user.password)
                if(!validPassword){
                    return res.status(400).json({
                        message: 'Password is wrong!'
                    })
                }
                
                //generar jwt
                const token = await generarJWT(user.id)
disconnect()        
                res.json({
                    user, 
                    token
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Send a message to the admin'
                })
            }
}
        

