import tree from "./tree.json";
const Loader = ({ isOpen }) => {
  return (
    <div id="app-loader">
      <div className="lottie-container">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <lottie-player
          src={tree}
          background="transparent"
          speed="1"
          style={{ width: "100%", height: "100%" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      <p className="loading-text text-3xl os-bold text-brand-green">
        DIBYENDU TEWARY
      </p>
      <p className="loading-text">Crafting Your Experience...</p>
    </div>
  );
};

export default Loader;
