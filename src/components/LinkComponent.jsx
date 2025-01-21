import React from "react";
import { Link } from "react-router-dom";

const LinkComponent = (props) => {
  return (
    <div>
      <Link to={props.path}>
        <p className="text-blue-500 hover:underline mt-1">{props.data}</p>
      </Link>
    </div>
  );
};

export default LinkComponent;
