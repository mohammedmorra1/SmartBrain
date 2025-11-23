import React, { useContext, useEffect } from "react";
import { Context } from "./Context";

const FaceRecognition = () => {
  const { state } = useContext(Context);

  return (
    <div className="flex justify-center px-2 sm:px-4">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {state.imgUrl && (
          <>
            <img
              id="inputImage"
              src={state.imgUrl}
              className="w-full h-auto rounded-lg shadow-md"
              alt="Face detection"
            />
            {state.boxes.map((box, i) => (
              <div
                className="absolute cursor-pointer border-2 border-cyan-300 transition-all hover:border-cyan-400"
                style={state.boxes[i]}
                key={i}
              ></div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
