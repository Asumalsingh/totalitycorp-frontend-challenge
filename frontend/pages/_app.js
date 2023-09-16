import Navbar from "../src/components/Navbar";
import "../styles/globals.css";
import UserProvider from "../src/context/user/UserProvider";
import ProductProvider from "../src/context/product/ProductProvider";
import CartProvider from "../src/context/cart/CartProvider";
import Footer from "../src/components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default MyApp;
