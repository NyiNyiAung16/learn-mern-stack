const getPreviewURL = (e,setFile,setPreview) => {
    let file = e.target.files[0];
    setFile(file);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        setPreview(e.target.result);
    };
    fileReader.readAsDataURL(file);
}

export default getPreviewURL;