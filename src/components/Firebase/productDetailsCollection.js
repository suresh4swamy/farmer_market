const productDetailsCollection = function () {
    this.addNewProduct = data => {
        return this.product(this.auth.currentUser.uid).push(data);
    }
}

export default productDetailsCollection;