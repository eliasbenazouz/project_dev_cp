import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNavBar from "./Components/AppNavBar.js";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, noCurrentUser } from "./features/authSlice.js";
import Home from "./Components/pages/Home.js";
import PrivateRoute from "./Components/route/PrivateRoute.js";
import CustomerDashboard from "./Components/pages/CustomerDashboard.js";
import AdminDashboard from "./Components/pages/AdminDashboard.js";
import TeacherDashboard from "./Components/pages/TeacherDashboard.js";
import ManageRiders from "./Components/pages/ManageRiders.js";
import ManageUsers from "./Components/pages/ManageUsers.js";
import TeacherManageRiders from "./Components/pages/TeacherManageRiders.js";
import AdminManageHorses from "./Components/pages/AdminManageHorses.js";
import Planning from "./Components/pages/Planning.js";
import Spinner from "./Components/Spinner.js";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    const getUser = () => dispatch(getAuthUser("x"));
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      dispatch(noCurrentUser());
    }
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Router>
        <AppNavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute exact path="/planning" component={Planning} />
          <PrivateRoute
            exact
            path="/customer-dashboard"
            component={CustomerDashboard}
          />
          <PrivateRoute
            exact
            path="/admin-dashboard"
            component={AdminDashboard}
          />
          <PrivateRoute
            exact
            path="/admin-dashboard/manage-riders"
            component={ManageRiders}
          />
          <PrivateRoute
            exact
            path="/admin-dashboard/manage-users"
            component={ManageUsers}
          />
          <PrivateRoute
            exact
            path="/admin-dashboard/manage-horses"
            component={AdminManageHorses}
          />
          <PrivateRoute
            exact
            path="/teacher-dashboard"
            component={TeacherDashboard}
          />
          <PrivateRoute
            exact
            path="/teacher-dashboard/manage-riders"
            component={TeacherManageRiders}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
