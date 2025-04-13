import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "./App";
import { MenuList } from "./components/menu/meny";
import About from "./components/about/about";
import StatusModal from "./components/statusModal/StatusModal";
// import { ErrorPage } from "./pages/errorPage/ErrorPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<MenuList />} />
      <Route path="/about" element={<About />} />
      <Route path="/status" element={<StatusModal />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Route>
  )
);
