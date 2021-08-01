import React from "react";
import spinner from "../images/spinner.gif";

function ThemedSuspense() {
  return (
    <div className="w-full h-screen p-6 text-lg font-medium flex items-center justify-center  text-gray-600 dark:text-gray-400 dark:bg-gray-700">
      <div>
        <img src={spinner}></img>
      </div>
    </div>
  );
}

export default ThemedSuspense;
