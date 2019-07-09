
// https://medium.com/@650egor/react-30-day-challenge-day-4-firebase-photo-upload-delete-f7c59d73ae36

const uploadFilesDB = function () {
    const upload = (aId, aFolder, aFile, onUploadProgress) => {
        const storageRef = this.storage.ref();
        const img = typeof aFolder === "string" ? storageRef.child(aFolder).child(aFile.name) : storageRef.child(aFile.name);
        let uploadTask = aFile.base64 ? img.putString(aFile.base64.replace("data:image/jpeg;base64,", ""), 'base64', { contentType: 'image/jpeg' }) : img.put(aFile);
        // console.log(aFile);
        uploadTask.on("state_changed", (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onUploadProgress(progress, aId);

            /*
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
            */

        }, (error) => {
            console.log("error uploading file");
            // aFailureCallBackFn && aFailureCallBackFn(error, aId);
        });

        return new Promise((resolve, reject) => {
            uploadTask.then((snapshot) => {
                img.getDownloadURL().then((url) => {
                    resolve({ url, id: aId });
                })
            });
            uploadTask.catch(error => {
                reject(error);
            });
        });

    }

    const deleteImg = (aId, aFile) => {
        console.log("images/" + aFile);
        const storageRef = this.storage.ref();
        let del = storageRef.child("images/" + aFile).delete();
        return new Promise((resolve, reject) => {
            resolve(aId);
        });
    }

    this.uploadFile = (aFile, onUploadProgress) => {
        // let onUploadProgress = progress => {
        //     console.log('Upload is ' + progress + '% done');
        // }
        return upload.call(this, null, null, aFile, onUploadProgress);
    }
    this.uploadImage = (aId, aFile, onUploadProgress) => {
        return upload.call(this, aId, "images", aFile, onUploadProgress);
    }
    this.deleteImage = (aId, aFile) => {
        return deleteImg.call(this, aId, aFile);
    }
}

export default uploadFilesDB;