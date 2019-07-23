const productDetailsCollection = function () {
    this.addNewProduct = data => {
        return this.product(this.auth.currentUser.uid).push(data);
    }
    this.getProducts = () => {
        return new Promise((resolve, reject) => {
            this.products().once("value", snap => {
                resolve(snap.val());
            });
        });
    }
    this.getMyProducts = () => {
        return new Promise((resolve, reject) => {
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