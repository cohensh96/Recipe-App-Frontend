
const BASE_URL = "https://recipes-for-everyone-backend.onrender.com"
const useImage = (ImageString) => {
    if(ImageString === null || ImageString === undefined)
    return;
    const dataImage = ImageString;
    const dataURL = BASE_URL + dataImage.replace('uploads', "");
    return dataURL;
}

export default useImage