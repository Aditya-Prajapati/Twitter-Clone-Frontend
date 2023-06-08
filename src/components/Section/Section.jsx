import React, { useState } from "react";
import "./SectionStyles.css";

export default function Section() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChildClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="d-flex justify-content-between px-2 bd-highlight" id="Section">
      
      <div
        className={`p-2 flex-md-fill bd-highlight ${activeIndex === 0 ? "active" : ""
          }`}
        onClick={() => handleChildClick(0)}
      >
        For you
      </div>
      <div
        className={`p-2 flex-md-fill bd-highlight ${activeIndex === 1 ? "active" : ""
          }`}
        onClick={() => handleChildClick(1)}
      >
        Trending
      </div>
      <div
        className={`p-2 flex-md-fill bd-highlight ${activeIndex === 2 ? "active" : ""
          }`}
        onClick={() => handleChildClick(2)}
      >
        News
      </div>
      <div
        className={`p-2 flex-md-fill bd-highlight ${activeIndex === 3 ? "active" : ""
          }`}
        onClick={() => handleChildClick(3)}
      >
        Sports
      </div>
      {/* <div
        className={`p-2 flex-md-fill bd-highlight ${activeIndex === 4 ? "active" : ""
          }`}
        onClick={() => handleChildClick(4)}
      >
        Entertainment
      </div> */}

    </div>
  );
}
