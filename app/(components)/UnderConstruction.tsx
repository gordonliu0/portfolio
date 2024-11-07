import React from "react";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg text-white">
        {/* Emoji with bounce animation */}
        <div className="text-7xl animate-bounce">🚧</div>

        {/* Main text with gradient */}
        <h1 className="text-lg md:text-5xl font-bold">Under Construction</h1>

        {/* Subtle subtext */}
        <p className="text-sm font-normal">
          Building something awesome. Check back soon!
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
