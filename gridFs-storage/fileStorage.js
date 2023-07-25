const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

let bucket;
mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'gridFiles'
    })
    console.log('Storage engine is connected');
})

const storage = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: "gridFiles"
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({
    storage
})

function Retrieve(req, res) {
    const callback = (files) => {
        if (!files || files.length === 0) {
            return res.status(404)
                .json({
                    err: "no files exist"
                });
        }

        /**
         * The following header helps us to retrieve file with correct format.
         */
        res.setHeader("Content-Type", files[0].contentType);

        /**
         * The following header helps us to set the original filename(as saved) in the attachment.
         * @param {*} inline allow the file to be viewable on the browser
         * @param {*} attachment allow the file to be downloadable on the browser
         */
        res.setHeader("Content-Disposition", `inline; filename="${files[0].filename}"`);

        bucket.openDownloadStream(new mongoose.Types.ObjectId(req.params.id))
            .pipe(res);
    }

    const file = bucket
        .find({
            _id: new mongoose.Types.ObjectId(req.params.id)
        })
        .toArray();
    file.then(callback);
}

function Rename(id, NewName) {
    const file = bucket.rename(new mongoose.Types.ObjectId(id), NewName);
    return file;
}

function Delete(id) {
    const file = bucket.delete(new mongoose.Types.ObjectId(id));
    return file;
}

module.exports = { upload: upload, retrieve: Retrieve, rename: Rename, delete: Delete };