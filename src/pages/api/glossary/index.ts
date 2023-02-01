import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../db'
import Term, { ITerm } from '../../../models/term'

type Data =| {message: string}  | ITerm[] | ITerm

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	switch(req.method) {
	case 'GET':
		return getTerms(res)
	case 'POST':
		return createTerm(req,res)
	default:
		return res.status(400).json({message: "Endpoint don't exists"})
	}
}


const getTerms = async (res:NextApiResponse<Data>) => {

	await connect()

	// Si ejecuto la primera vez este podria hacer una busqueda con un math random para obtener un id
	//devolvemos solo una de manera aleatoria

	const terms = await Term.find()

	await disconnect()

	res.status(200).json(terms)
}


const createTerm =  async (req: NextApiRequest, res:NextApiResponse<Data>) => {

	const {title, description, translate, level, user, category, phrases} = req.body;

	const term = new Term({title, description, translate, level, user, category, phrases, createdAt: Date.now()})

	try {
		await connect()
		term.save()
		await disconnect()
		res.status(201).json(term)
		

	} catch (error) {
		await disconnect()
		res.status(400).json({message: 'Error Parameters'})


	}

}