import mongoose, {Model,Schema} from 'mongoose'

export interface IUser {
    name: string
    lastname: string
    email: string
    password: string
    age?: number
    createdAt?: Date
    status?: boolean
	premium?: boolean,
	premiumExpiration?: Date
}
const userSchema = new Schema<IUser>({
	name: {type:String, required: true},
	lastname: {type:String, required: true},
	email: {type:String, required: true},
	password: {type:String, required: true},
	age: {type:Number, required: false},
	createdAt: {type: Date, default: new Date()},
	status: {type: Boolean, default: true},
	premium: {type: Boolean, default: false},
	premiumExpiration: {type: Date, default: new Date()},
})


userSchema.methods.toJSON = function(){
	// eslint-disable-next-line no-unused-vars
	const {__v, ...user} = this.toObject()

	return user
}

const User : Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema)

export default User