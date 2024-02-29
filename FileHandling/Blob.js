const multer = require('multer');
const mongoose = require('mongoose');

let bucket;
mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'gridFiles'
    })
    console.log('Storage engine is connected');
});

function MyCustomStorage(opts) {

}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    var outStream = bucket.openUploadStream(file.originalname, { contentType: file.mimetype });

    file.stream.pipe(outStream)
    outStream.on('error', cb)
    outStream.on('finish', function () {
        cb(null, {
            size: outStream.gridFSFile.length,
            _id: outStream.gridFSFile._id,
            uploadDate: outStream.gridFSFile.uploadDate
        })
    })
}

MyCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    bucket.delete(file.id, cb);
}

const storage = new MyCustomStorage()

const upload = multer({
    storage: storage
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

        bucket.openDownloadStream(mongoose.Types.ObjectId.createFromHexString(req.params.id))
            .pipe(res);
    }

    const file = bucket
        .find({
            _id: mongoose.Types.ObjectId.createFromHexString(req.params.id)
        })
        .toArray();
    file.then(callback);
}

function Rename(id, NewName) {
    bucket.rename(id, NewName);
}

function Delete(id) {
    bucket.delete(id);
}

module.exports = { upload: upload, retrieve: Retrieve, rename: Rename, delete: Delete };