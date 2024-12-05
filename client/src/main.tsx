import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux/store";
import {routers} from "./App"
import { RouterProvider } from "react-router-dom";
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  </>
);
