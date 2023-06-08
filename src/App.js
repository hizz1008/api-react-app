import React from "react";
import router from "./router/Navigation";
import { RouterProvider } from "react-router";

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
