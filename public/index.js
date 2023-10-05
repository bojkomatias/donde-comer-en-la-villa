document.addEventListener("change", () => {
  document.getElementById('imageContainer').src = URL.createObjectURL(
    document.getElementById('image').files[0],
  );


  // 👇️ reset file input once you're done
  imageInput.value = null;
})

