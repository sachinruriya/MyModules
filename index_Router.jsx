
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";

import Test from "./Test";
const root = ReactDOM.createRoot(document.getElementById("root"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="registeration" element={<Register />} />
        <Route
          path="dashboard"
          element={ <Dashboard />}
        />
        <Route path="address" element={ <AddAdress />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profileimg/>}> </Route>
      </Route>
    </Routes>
  );
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
    <Test/>

  </React.StrictMode>
);

