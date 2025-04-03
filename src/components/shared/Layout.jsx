import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children, page, headerGradient = false }) => {
  return (
    <div id="Layout" className=" w-full max-w-[1366px] mx-auto bg-white pb-6 ">
      <div className="w-full border-b">
        <Navigation page={page} />
      </div>
      {headerGradient && <div className="header-gradient w-full h-1" />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
