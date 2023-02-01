import mongoose, {Model,Schema} from 'mongoose'

export interface ICategory {
    name: string
    createdAt?: Date
}
const categorySchema = new Schema<ICategory>({
	name: {type:String, required: true},
	createdAt: {type: Date, default: new Date()},
})

categorySchema.methods.toJSON = function(){
	// eslint-disable-next-line no-unused-vars
	const {__v, ...category} = this.toObject()

	return category
}

const Category : Model<ICategory> = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category