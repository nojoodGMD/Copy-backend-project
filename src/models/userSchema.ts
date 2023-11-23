import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
  name: string;
  role: string;
  isBanned: boolean;
  email: string;
  password: string;
  image: string;
  phone: string;
  order: Schema;
}


const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true,'Please enter the user name'],
    trim: true,
    minlength:[3,'Name must be at least 3 characters'],
    maxlength:[50, 'Name must be less than 50 characers'],
  },
  role:{
    type: String,
    default : "visitor"
  },
  isBanned:{
    type: Boolean,
    default: false,
  },
  email:{
    type: String,
    required: [true,'Please enter the email address'],
    trim: true,
    unique: true,
    lowercase: true,
    validate:{
      validator: function ( emailValue : string){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
      },
      message: 'Please enter a valid email address'
    }
  },
  password:{
    type: String,
    required: [true,'Please enter the password address'],
    trim: true,
    minlength: [8, 'Please enter more than 8 characters in password'],
    set: (password : string) => bcrypt.hashSync(password,5)
  },
  image:{
    type: String,
    default: './public/img/no-profile-img-default.webp',
  },
  phone:{
    type:String,
    trim: true,
    required: true,
    minlength: [10, 'Please enter a correct phone number length.'],
    validate:{
      validator: function(phoneNum: string){
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNum);
      },
      message: 'Please enter a valid phone number'
    }
  },
  // relation between order and user should be many orders to one user
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'Order' ,
  }],
},
{timestamps : true}
)

export const User =  model<IUser>('User', userSchema)
