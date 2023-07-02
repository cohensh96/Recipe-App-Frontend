
const BASE_URL = "https://recipe-app-api-khxh.onrender.com/"
//const BASE_URL='http://localhost:3500'
const useImage = (ImageString) => {
    if(ImageString === null || ImageString === undefined)
    return;
    const dataImage = ImageString;
    const dataURL = BASE_URL + dataImage.replace('uploads', "");
    return dataURL;
}

export default useImage