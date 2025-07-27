import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Verification from "./pages/Verification";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <Verification />,
  },
]);

export default routers;
