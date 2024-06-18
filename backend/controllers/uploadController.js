const uploadController = (req,res) => {
    try{
        let filePath = req.file?.filename;
        if(!filePath){
            throw new Error("Photo is required")
        }
        return res.json(filePath);
    }catch(e) {
        return res.status(500).json({msg:e.message})
    }
}

module.exports = uploadController;