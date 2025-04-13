import React from "react";
import "./ErrorPage.scss";
import Button from "../../components/button/button";

export const ErrorPage: React.FC = () => {
  return (
    <div className="ErrorPage">
      <h1>Oops!</h1>
      <br />
      <h2>404 - PAGE NOT FOUND</h2>
      <br />
      <br />
      <p>
        <strong>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </strong>
      </p>
      <br />
      <br />
      <Button bgColor="blue" color="white">
        <p>Go to homepage</p>
      </Button>
    </div>
  );
};
