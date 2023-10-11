import { Image } from 'image-js';
//Supabase client already initialized with its credentials.
import { supabase as supabaseClient } from "utils/supabase"

/**This function returns an object with two keys: 
 * @result returned by the Supabase upload function. This object returns among other things, an error, so to check for error, simply use result.error.
 * @image_url a string that points to the image resource stored in the Supabase bucket*/
export default async function imageResizer(file: Blob, file_name: String) {

  const fileSize = file.size;
  const factor = 100000 / fileSize;
  let image = await file!.arrayBuffer()
  //Before uploading the image I make sure to remove every space and replace it with an underscore and then normalize it too to remove accent marks to reduce the chance of having trouble with the URL.
  console.log(file_name)
  file_name.normalize("NFKC").replaceAll(" ", "_").replace(/[^\w]/g, '')
  console.log(file_name.replaceAll(" ", "_").normalize())
  console.log("Image size:", fileSize * 0.0009765625 + "KB")
  console.log("Factor: ", factor)

  const resizedImage = await Image.load(image).then((image) =>
    //If the image is bigger than 100KB, the image gets resized by a factor. If not, the image stays the same. I did it this way to use the same variable "resizedImage".
    image.resize({ factor: file.size > 100000 ? factor : 1 })
  )

  //I convert the resizedImage to a Blob, and I'm explicitly telling that the type of that Blob is an image, otherwise, Supabase wouldn't recognize it as an image and the URL provided didn't work.
  const imageToUpload = new Blob([resizedImage.toBuffer()]).slice(0, resizedImage.size, "image/jpg")


  return supabaseClient.storage
    .from("dondecomerenlavilla_images")
    .upload(
      `business_images/${file_name}.jpg`,
      imageToUpload,
      {

        cacheControl: "3600",
        upsert: false,
      }
    )
    .then((result) => {
      const image_url = process.env.SUPABASE_IMAGE_PREFIX_URL! + file_name + ".jpg"
      if (result.error) console.log(result.error)
      return { result, image_url };
    });


}

