module.exports = {
    add(cart, item) {
      cart.push(item);
    },
  
    del(cart, id) {
      for (let i = cart.length - 1; i >= 0; i--) {
        if (id === cart[i]) {
          cart.splice(i, 1);
          return;
        }
      }
    },
  
    getNumberOfItems(cart) {
      return cart.length;
    }
  };
  