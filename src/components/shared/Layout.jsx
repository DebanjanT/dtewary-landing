import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children, page }) => {
  return (
    <div id="Layout" className="w-full max-w-[1366px] mx-auto bg-white">
      <Navigation page={page} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
