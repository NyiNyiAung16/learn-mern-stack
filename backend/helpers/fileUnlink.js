const fs = require('fs').promises;

const fileUnlink = async(filepath) => {
    try{
        let file = `${__dirname}/../public/${filepath}`;
        await fs.access(file);
        await fs.unlink(file);
    }catch(e) {
        return e.message;
    }
}

module.exports = fileUnlink;

