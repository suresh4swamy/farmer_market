const productDetailsCollection = function () {
    this.addNewProduct = data => {
        return this.product(this.auth.currentUser.uid).push(data);
    }
    this.getMyProducts = () => {
        return new Promise((resolve, reject) => {
            console.log(this.auth.currentUser);
            if (this.auth.currentUser) {
                this.product(this.auth.currentUser.uid).once("value", snap => {
                    resolve(snap.val());
                });
            } else {
                reject(new Error("Unauthorised."));
            }
        });
    }
}

export default productDetailsCollection;