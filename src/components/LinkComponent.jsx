import React from "react";
import { Link } from "react-router-dom";

const LinkComponent = (props) => {
  return (
    <div>
      <Link to={props.path}>
        <p className="text-[#57A649] opacity-80 hover:underline hover:opacity-100 mt-1">{props.data}</p>
      </Link>
    </div>
  );
};

export default LinkComponent;
