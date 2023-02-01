import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../db'
import Category, { ICategory } from '../../../models/category'

type Data =| {message: string}  | ICategory[] | ICategory

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	switch(req.method) {
	case 'GET':
		return getCategories(res)
	case 'POST':
		return createCategory(req,res)
	default:
		return res.status(400).json({message: "Endpoint don't exists"})
	}
}


const getCategories = async (res:NextApiResponse<Data>) => {

	await connect()

	const categories= await Category.find()

	await disconnect()

	res.status(200).json(categories)
}


const createCategory =  async (req: NextApiRequest, res:NextApiResponse<Data>) => {

	const {name} = req.body;

	const newCat = new Category({name, createdAt: Date.now()})

	try {
		await connect()
		newCat.save()
		await disconnect()
		res.status(201).json(newCat)
		

	} catch (error) {
		await disconnect()
		res.status(400).json({message: 'Error Parameters'})


	}

}