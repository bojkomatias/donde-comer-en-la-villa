import { Image } from 'image-js';


export default async function imageResizer(file: Blob) {

  const fileSize = file.size;
  const factor = 100000 / fileSize;

  let image = await file.arrayBuffer()


  if (fileSize > 100000) {

    console.log("Image size:", fileSize * 0.0009765625 + "KB")
    console.log("Factor: ", factor)

    const resizedImage = Image.load(image).then((image) =>
      image.resize({ factor: factor })
    )
    return (await resizedImage).toBlob()
  }
  else {
    return Image.load(image).then(image => {
      return image.toBlob()
    })
  }

}