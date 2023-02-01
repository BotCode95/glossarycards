import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../db'
import User,{IUser} from '../../../models/user';
import bcryptjs from 'bcryptjs'
import { generarJWT } from '@/utils/generar-jwt';

type Data =| {message: string}  | {users: IUser[]} | {user: IUser, token: unknown}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	switch(req.method) {
	case 'GET':
		return getUsers(res)
	case 'POST':
		return createUser(req,res)
	default:
		return res.status(400).json({message: "Endpoint don't exists"})
	}
}


const getUsers = async (res:NextApiResponse<Data>) => {

	await connect()

	const users = await User.find()

	await disconnect()

	res.status(200).json({users})
}


const createUser =  async (req: NextApiRequest, res:NextApiResponse<Data>) => {

	const {name,lastname,email,password, age,status, premium, premiumExpiration} = req.body;

	const newUser = new User({name,lastname,email,password, age,status,  premium, premiumExpiration, createdAt: Date.now()})

	try {
		await connect()
        const salt = bcryptjs.genSaltSync()
		newUser.password = bcryptjs.hashSync(password, salt)
		newUser.save()

		const token = await generarJWT( newUser.id )

		await disconnect()
		res.status(201).json({user: newUser, token})
		
	} catch (error) {
		await disconnect()
		res.status(400).json({message: 'Error Parameters'})
	}

}