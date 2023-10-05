import { Image } from 'image-js';


export default async function imageResizer(image: any){
 Image.load(image).then(()=>{
    console.log("Width", image.width)
 })
}