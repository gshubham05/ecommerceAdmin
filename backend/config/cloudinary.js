import {v2 as cloudinary} from "cloudinary"

const connectClodudinary =async()=>{
cloudinary.config({
    cloud_name : process.env.CLOUDINAR_NAME,
    api_key:process.eventNames.CLOUDINARY_API,
    api_secret_key:process.eventNames.CLOUDINARY_SECRET_KEY
})
}

export default connectClodudinary;