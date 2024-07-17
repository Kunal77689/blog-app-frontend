import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Categories from "./components/Categories";
import ProfilePage from "./components/ProfilePage";

const routes = [
  { path: "/login", component: LoginForm, requiresAuth: false },
  { path: "/signup", component: Signup, requiresAuth: false },
  { path: "/", component: HomePage, requiresAuth: true },
  { path: "/categories", component: Categories, requiresAuth: true },
  { path: "/profile", component: ProfilePage, requiresAuth: true },
];

export default routes;
