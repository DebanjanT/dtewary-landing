import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Function to hide the loader
const hideLoader = () => {
  const loader = document.getElementById("app-loader");
  if (loader) {
    loader.classList.add("app-loader-hidden");
    // Remove the loader from DOM after transition completes
    setTimeout(() => {
      loader.remove();
    }, 600);
  }
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Hide loader when React has rendered
// You can adjust this timing based on your app's needs
window.addEventListener("load", () => {
  // Optional: add a small delay to ensure everything is ready
  setTimeout(hideLoader, 3000);
});
