import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show login modal if user is not authenticated
    if (!loading && !currentUser) {
      setShowLoginModal(true);
    }
  }, [currentUser, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green" />
      </div>
    );
  }

  const handleCloseModal = () => {
    setShowLoginModal(false);
    // Navigate back to home if user closes modal without logging in
    if (!currentUser) {
      window.location.href = "/";
    } else {
      window.location.href = location.pathname;
    }
  };

  return (
    <>
      {children}
      <LoginModal
        isOpen={showLoginModal && !currentUser}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProtectedRoute;
