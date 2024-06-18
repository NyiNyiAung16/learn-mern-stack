import axios from '../helpers/axios'

const getPhotoURL = async(file,setErrors) => {
    try{
        let formData = new FormData();
        formData.set('photo_url',file);

        let res = await axios.post('/api/upload',formData,{
            headers:{
                'Accept': 'multipart/form-data'
            }
        });
        return res.data;
    }catch(e) {
        setErrors(e.response.data.errors);
        setTimeout(() => {
            setErrors({});
        }, 2000);
    }
}

export default getPhotoURL;