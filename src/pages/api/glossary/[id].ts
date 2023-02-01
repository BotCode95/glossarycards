import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import {connect, disconnect} from '../../../db'
import Term, { ITerm } from '../../../models/term';

type Data = {
    message: string
} | ITerm

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

	const {id} = req.query


	if(!mongoose.isValidObjectId(id)){
		return res.status(400).json({message: 'The id is invalid!'})
	}


	switch(req.method) {
	case 'PUT' :
		return updateTerm(req,res, id)
	case 'GET' :
		return getTerm(req,res, id)
	default :
		return res.status(400).json({message: 'Method not exist!'})

	}
}


const updateTerm = async (req: NextApiRequest, res: NextApiResponse<Data>, id?: string | string[]) => {

	await connect()

	const termToUpdate = await Term.findById(id);

	if(!termToUpdate){
		await disconnect()
		return res.status(400).json({message: 'Not exist in db this ID'})

	}

	try {
		const updatedEntry = await Term.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
		await disconnect()
		return res.status(200).json(updatedEntry!)
        
	} catch (error: any) {
		await disconnect()
		return res.status(400).json({message: error.erros.status.message})
        
	}

}

const getTerm = async (req: NextApiRequest, res: NextApiResponse<Data>, id?: string | string[]) => {

	await connect()

	const term = await Term.findById(id).populate('category', 'name')

	if(!term){
		await disconnect()
		return res.status(400).json({message: 'Not exist in db this ID'})

	}

	try {
		await disconnect()
		return res.status(200).json(term)
	} catch (error: any) {
		await disconnect()
		return res.status(400).json({message: error.erros.status.message})   
	}
}