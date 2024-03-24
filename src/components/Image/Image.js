import { Fragment } from "react";

export const Image = ({ src }) => {
  return (
    <Fragment>
      {src ? (
        <img
          className="rounded-full aspect-square w-8 object-cover"
          src={src}
          alt=""
        />
      ) : (
        <div className="bg-gray-100 rounded-full aspect-square w-8 object-cover"></div>
      )}
    </Fragment>
  );
};
