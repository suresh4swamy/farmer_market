import MyCart from './MyCart';
import MyCartCount from './MyCartCount';
import MyCartContext from './context';

let MyCartState = {
    count: 0,
    cartList: {

    },
    addToCart: (item, count) => {
        if (MyCartState.cartList[item.id] && typeof MyCartState.cartList[item.id].count === "number") {
            MyCartState.cartList[item.id].count += count;
        } else {
            MyCartState.cartList[item.id] = item;
            MyCartState.cartList[item.id].count = 1;
        }
        MyCartState.refreshCount();
    },
    refreshCount: () => {
        let count = 0;
        for (let key in MyCartState.cartList) {
            count += MyCartState.cartList[key].count;
        }
        MyCartState.count = count;
    }
}

export { MyCartContext, MyCartState, MyCartCount };
export default MyCart;