import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../../db'
import { generarJWT } from '@/utils/generar-jwt'

type Data =| {message: string}  | {user: any, token: unknown}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	switch(req.method) {
	case 'GET':
		return validateTokenUsuario(req, res)
	default:
		return res.status(400).json({message: "Endpoint don't exists"})
	}
}

const validateTokenUsuario =  async (req: NextApiRequest, res:NextApiResponse<Data>) => {
        // Generar el JWT
        connect()
        const token = await generarJWT( (<any>req).user._id )
        disconnect()
        
        res.json({
            user: (<any>req).user,
            token: token,
        })
    }

