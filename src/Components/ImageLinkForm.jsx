import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "./Context";
import "../App.css";

const ImageLinkForm = () => {
  const [input, setInput] = useState("");
  const { state, dispatch, actions } = useContext(Context);

  const createBox = ({ topRow, leftCol, bottomRow, rightCol }) => {
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: leftCol * width,
      top: topRow * height,
      right: width - rightCol * width,
      bottom: height - bottomRow * height,
    };
  };

  const handleFetch = (imageUrl) => {
    console.log("Fetching for image URL:", imageUrl);
    console.log("Using MODEL_API:", import.meta.env.VITE_MODEL_API);

    const raw = JSON.stringify({
      image_url: imageUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: raw,
    };

    fetch(`https://${import.meta.env.VITE_MODEL_API}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const regions = result;
        if (regions.length > 0) {
          regions.forEach((boundingBox) => {
            // Accessing and rounding the bounding box values
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            const box = createBox({
              topRow,
              leftCol,
              bottomRow,
              rightCol,
            });

            dispatch({ type: actions.SET_BOXES, payload: box });
          });
          fetch(`https://${import.meta.env.VITE_SERVER_API}/image`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: state.id,
            }),
          });
          dispatch({ type: actions.INCREMENT_SCORE });
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: actions.CLEAR_BOXES });
    dispatch({ type: actions.SET_URL, payload: input });
    handleFetch(input);
  };

  return (
    <div className="flex justify-center">
      <div className=" p-3 flex flex-col items-center gap-2 flex-grow max-w-3xl">
        <p>
          This Magic Brain will detect faces in your pictures, Give it a try :)
        </p>
        <form className="formStyle flex shadow-xl h-20 w-full  items-center rounded p-6">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="bg-gray-100 h-8 flex-4/6 focus:border-none focus:outline-none p-1 "
            type="text"
          />
          <button
            onClick={handleSubmit}
            className="h-8 flex-2/6 rounded-r-lg border border-white bg-pink-600 text-white p-1 hover:scale-105 transition-all duration-200 active:bg-pink-800 active:scale-95"
          >
            Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
