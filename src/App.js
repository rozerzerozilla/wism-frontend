import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import Home from "./components/Home/Home";
import Search from "./components/Home/Search";
import Categories from "./components/Home/Categories";
import HomeBusiness from "./components/Home/Business";
import Landing from "./components/Home/Landing";
import ClientRegister from "./components/Clients/Auth/Register";
import ClientVerify from "./components/Clients/Auth/Verify";
import ClientLogin from "./components/Clients/Auth/Login";
import ClientsRoutes from "./components/Clients/Clients.Routes";
import ClientDashboard from "./components/Clients/Home/Dashboard";
import ClientBusiness from "./components/Clients/Home/Business";
import ClinetAddBusiness from "./components/Clients/Home/AddBusiness";
import ClientService from "./components/Clients/Home/Service";
import ClientAddService from "./components/Clients/Home/AddServices";
import ClientStaff from "./components/Clients/Home/Staff";
import AddStaff from "./components/Clients/Home/AddStaff";
import ClientCustomForm from "./components/Clients/Home/Custom";
import ClientTokens from "./components/Clients/Home/Tokens";
import EditBusiness from "./components/Clients/Home/EditBusiness";
import EditStaff from "./components/Clients/Home/EditStaff";
import ClientCode from "./components/Clients/Home/Code";
//admin routes
import AdminLogin from "./components/Admin/Auth/Login";
import AdminRoutes from "./components/Admin/Admin.Routes";
import AdminDashboard from "./components/Admin/Home/Dashboard";
import AdminBusinesses from "./components/Admin/Home/Businesses";
import AdminBusiness from "./components/Admin/Home/Business";
import AdminAddService from "./components/Admin/Home/AddServices";
import AddBusinessStaff from "./components/Admin/Home/AddStaff";
import EditBusinessStaff from "./components/Admin/Home/EditStaff";
import AdminAddBusiness from "./components/Admin/Home/AddBusiness";
import AdminCategories from "./components/Admin/Home/Categories";
import AdminSubCategories from "./components/Admin/Home/SubCategories";
import AdminEmployees from "./components/Admin/Home/Employess";
import AdminAddEmp from "./components/Admin/Home/AddEmployees";
import AdminProfile from "./components/Admin/Home/Profile";
import AdminEditBusiness from "./components/Admin/Home/EditBusiness";
function App() {
  return (
    <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/categories/:id" exact component={Categories} />
      <Route path="/business/:id" exact component={HomeBusiness} />
      <Route path="/landing" exact component={Landing} />

      <Route path="/clients/register" exact component={ClientRegister} />
      <Route path="/clients/verify/:phone" exact component={ClientVerify} />
      <Route path="/clients/login" exact component={ClientLogin} />
      <ClientsRoutes
        path="/clients/dashboard"
        exact
        component={ClientDashboard}
      />
      <ClientsRoutes
        path="/clients/business"
        exact
        component={ClientBusiness}
      />
      <ClientsRoutes
        path="/clients/addbusiness"
        exact
        component={ClinetAddBusiness}
      />

      <ClientsRoutes path="/clients/services" exact component={ClientService} />
      <ClientsRoutes
        path="/clients/addservices"
        exact
        component={ClientAddService}
      />
      <ClientsRoutes path="/clients/staffs" exact component={ClientStaff} />

      <ClientsRoutes path="/clients/addstaffs" exact component={AddStaff} />
      <ClientsRoutes
        path="/clients/editstaff/:id"
        exact
        component={EditStaff}
      />
      <ClientsRoutes path="/clients/tokens" exact component={ClientTokens} />
      <ClientsRoutes
        path="/clients/customform"
        exact
        component={ClientCustomForm}
      />
      <ClientsRoutes
        path="/clients/editbusiness"
        exact
        component={EditBusiness}
      />
      <ClientsRoutes path="/clients/codes" exact component={ClientCode} />

      <Route path="/admin/login" exact component={AdminLogin} />
      <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
      <AdminRoutes path="/admin/business" exact component={AdminBusinesses} />
      <AdminRoutes path="/admin/business/:id" exact component={AdminBusiness} />

      <AdminRoutes
        path="/admin/business/service/:id"
        exact
        component={AdminAddService}
      />
      <AdminRoutes
        path="/admin/business/emp/:id"
        exact
        component={AddBusinessStaff}
      />
      <AdminRoutes
        path="/admin/business/emp/:id/:clientID"
        exact
        component={EditBusinessStaff}
      />
      <AdminRoutes
        path="/admin/addbusiness"
        exact
        component={AdminAddBusiness}
      />
      <AdminRoutes
        path="/admin/editbusiness/:id"
        exact
        component={AdminEditBusiness}
      />

      <AdminRoutes path="/admin/categories" exact component={AdminCategories} />
      <AdminRoutes
        path="/admin/subcategories"
        exact
        component={AdminSubCategories}
      />
      <AdminRoutes path="/admin/employees" exact component={AdminEmployees} />

      <AdminRoutes path="/admin/addemployee" exact component={AdminAddEmp} />

      <AdminRoutes path="/admin/profile" exact component={AdminProfile} />

      <Route path="*">
        <h1>The Page You're Looking for not found!</h1>
      </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress="undefined"
        theme="colored"
        icon={true}
      />
  </>);
}

export default App;
