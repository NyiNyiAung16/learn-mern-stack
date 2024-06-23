import App from '../App';
import { createBrowserRouter } from 'react-router-dom'
import Home from '../page/Home';
import About from '../page/About';
import RecipeForm from '../page/RecipeForm';
import SignUpForm from '../page/SignUpForm';
import SignInForm from '../page/SignInForm';
import RequireAuth from '../components/RequiredAuth';
import UserProfile from '../components/UserProfile';
import UnRequiredAuth from '../components/UnRequiredAuth';
import RecipeDetail from '../page/RecipeDetail';
import ProfilePicture from '../components/ProfilePicture';
import EmailAndName from '../components/EmailAndName';
import UpdatePassword from '../components/UpdatePassword';
import FavoriteRecipes from '../page/FavoriteRecipes';
import ErrorPage from '../error/errorPage';
import MustBeAdmin from '../components/MustBeAdmin';
import Dashboard from '../page/admin/Dashboard';
import Recipes from '../page/admin/Recipes';
import AllRecipes from '../page/Recipes';
import Admin from '../page/Admin';

let router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/recipes',
        element:<AllRecipes/>
      },
      {
        path:'/recipe/create',
        element: (
          <RequireAuth>
            <RecipeForm/>
          </RequireAuth>
        )
      },
      {
        path:'/recipes/edit/:id',
        element: (
          <RequireAuth>
            <RecipeForm/>
          </RequireAuth>
        )
      },
      {
        path:'/recipes/:id',
        element: <RecipeDetail/>
      },
      {
        path:'/user/favoriteRecipes',
        element: (
          <RequireAuth>
            <FavoriteRecipes/>
          </RequireAuth>
      )
      },
      {
        path:'/user-profile',
        element: (
        <RequireAuth>
          <UserProfile/>
        </RequireAuth>
        )
      },
      {
        path:'/user-profilePicture',
        element: (
          <RequireAuth>
            <ProfilePicture/>
          </RequireAuth>
      )
      },
      {
        path:'/user-email&name',
        element: (
          <RequireAuth>
            <EmailAndName/>
          </RequireAuth>
      )
      },
      {
        path:'/user-password',
        element: (
          <RequireAuth>
            <UpdatePassword/>
          </RequireAuth>
      )
      },
      {
        path: '/sign-up',
        element: (
          <UnRequiredAuth>
            <SignUpForm/>
          </UnRequiredAuth>
        )
      },
      {
        path: '/sign-in',
        element: (
          <UnRequiredAuth>
            <SignInForm/>
          </UnRequiredAuth>
        )
      }
    ]
  },
  {
    path:'/admin',
    element: (
      <MustBeAdmin>
        <Admin/>
      </MustBeAdmin>
    ),
    children: [
      {
        path:'/admin/dashboard',
        element: <Dashboard/>
      },
      {
        path:'/admin/recipes',
        element: <Recipes/>
      }
    ]
  },
]);

export default router;