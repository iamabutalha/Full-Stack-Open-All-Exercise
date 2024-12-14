import React from "react";
import { useParams } from "react-router-dom";

const ParamComponents = () => {
  const { id } = useParams();
  return <div>Params {id}</div>;
};

export default ParamComponents;
