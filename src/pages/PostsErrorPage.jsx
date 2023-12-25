import React from 'react';
import {useRouteError} from "react-router-dom";

export default function PostsErrorPage() {
    const error = useRouteError();

  return (
    <>
    <div>Ooops! something happened</div>
    <p>{error.message}</p>
    </>
  );
}
