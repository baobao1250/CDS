import React from "react";
import { useState } from "react";
import "../../../App.css";


export const ReadMore = ( { children }: any) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    if(text) {
        return (
            <p className="text">
              {isReadMore ? text.slice(0, 250) : text}
              <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...đọc thêm" : "\nthu gọn"}
              </span>
            </p>
          );
    }
    return null;
};