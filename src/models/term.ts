import mongoose, {Model,Schema} from 'mongoose'

export interface ITerm {
	codigo: number
    title: string
    description:string
    translate:string
    level: Level
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
	user: { type: Schema.Types.ObjectId, ref: 'User' }
    phrases: string[]
    createdAt?: Date
}

type Level = 'Hard' | 'Medium' | 'Easy'
const termSchema = new Schema<ITerm>({
	codigo: {type: Number, unique: true, sparse: true},
	title: {type:String, required: true},
	translate: {type:String, required: true},
	description: {type:String, required: false},
    level:{type: String, enum :{ values: ['Hard', 'Medium', 'Easy']}, default: 'Hard'},
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
    phrases: [{ type: String}],
	createdAt: {type: Date, default: Date.now()},
})

termSchema.methods.toJSON = function(){
	// eslint-disable-next-line no-unused-vars
	const {__v, ...term} = this.toObject()

	return term
}

const Term : Model<ITerm> = mongoose.models.Term || mongoose.model('Term', termSchema)

export default Term