/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useContext, useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/api";
import NavbarComponent from "./components/NavbarComponent";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyCollection from "./pages/MyCollection";
import AddLiterature from "./pages/AddLiterature";
import DetailPDF from "./pages/DetailPDF";
import Chat from "./pages/Chat";

import LazyLoading from "./components/LazyLoading";

const AdminPage = lazy(() => import("./pages/AdminPage"));

function App() {
  const { dataUser, setDataUser } = useContext(UserContext);

  useEffect(() => {
    checkUser(setDataUser);
    console.log("base url", process.env.REACT_APP_BASE_URL_BE);
  }, [dataUser.isLogin]);

  return (
    <div>
      <NavbarComponent />
      <div className="main-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {dataUser.status == "user" ? (
            <Switch>
              <Route path="/home/:status" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/my-collection" component={MyCollection} />
              <Route path="/add-literature" component={AddLiterature} />
              <Route path="/detail-pdf/:id" component={DetailPDF} />
              <Route path="/complain" component={Chat} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/admin-page">
                <Suspense fallback={<LazyLoading />}>
                  <AdminPage />
                </Suspense>
              </Route>
              <Route path="/complain" component={Chat} />
            </Switch>
          )}
        </Switch>
      </div>
    </div>
  );
}

const checkUser = async (setDataUser) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.getItem("token"));
      const response = await API.get("/check-auth");
      if (response?.status === 200) {
        if (response.data.data) {
          setDataUser({
            isLogin: true,
            ...response.data.data,
          });
        }
      } else {
        throw new Error(response.data.status);
      }
    }
  } catch (error) {
    throw new Error(error.response());
  }
};

export default App;
