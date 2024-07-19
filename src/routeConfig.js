import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Categories from "./components/Categories";
import ProfilePage from "./components/ProfilePage";
import CreatePost from "./components/CreatePost"; // Import the CreatePost component

const routes = [
  { path: "/login", component: LoginForm, requiresAuth: false },
  { path: "/signup", component: Signup, requiresAuth: false },
  { path: "/", component: HomePage, requiresAuth: true },
  { path: "/categories", component: Categories, requiresAuth: true },
  { path: "/profile", component: ProfilePage, requiresAuth: true },
  { path: "/createpost", component: CreatePost, requiresAuth: true }, // Add the new route
];

export default routes;
