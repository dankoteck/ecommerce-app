"use client";

import { ProductDetails } from "~/app/actions/getProductDetails";
import useLocalStorage from "~/hooks/localStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CartItem = ProductDetails & {
  quantity: number;
};

export default function AddToCart({
  currentProduct,
}: {
  currentProduct: ProductDetails;
}) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cartItems",
    []
  );

  const handleAddItemToCart = () => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === currentProduct?.id
    );

    if (productInCartIndex > -1) {
      const productInCart = cartItems[productInCartIndex];
      const newCardItems = [
        ...cartItems.slice(0, productInCartIndex),
        { ...productInCart, quantity: productInCart.quantity + 1 },
        ...cartItems.slice(productInCartIndex + 1),
      ];
      setCartItems(newCardItems);
    } else {
      setCartItems([...cartItems, { ...currentProduct!, quantity: 1 }]);
    }

    toast.success("Added item to cart.", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 mt-10 gap-y-4">
      <button
        onClick={handleAddItemToCart}
        className="inline-block px-8 py-3 font-medium text-center text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
      >
        Add to cart
      </button>
      <ToastContainer />
    </div>
  );
}
