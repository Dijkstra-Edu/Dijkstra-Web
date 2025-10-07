"use client";

export function WaitlistSignup() {
  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <a href="https://dijkstra.org.in">
          <div className="mb-6 flex items-center">
            <img
              src="/icon.png"
              alt="Dijkstra Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 mr-3"
            />
            <div className="flex flex-col">
              <h1 className="text-5xl sm:text-6xl font-semibold text-gray-100">
                Dijkstra
              </h1>
              <span className="text-sm sm:text-base text-gray-400 -mt-1">
                Platform
              </span>
            </div>
          </div>
        </a>

        <p className="text-base sm:text-lg mb-10 text-gray-400">
          Empowering students to build incredible software.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <a
            href="/onboarding"
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors duration-150"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors duration-150"
          >
            Login
          </a>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Dijkstra. All rights reserved.
      </footer>
    </div>
  );
}
