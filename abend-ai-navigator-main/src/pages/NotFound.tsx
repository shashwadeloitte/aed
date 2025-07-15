import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { STATIC_TEXTS } from "@/constants/staticTexts";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{STATIC_TEXTS.NOT_FOUND_404}</h1>
        <p className="text-xl text-gray-600 mb-4">{STATIC_TEXTS.PAGE_NOT_FOUND}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {STATIC_TEXTS.RETURN_TO_HOME}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
