import App from '../App';
import { createBrowserRouter } from 'react-router-dom'
import Home from '../page/Home';
import About from '../page/About';
import Contact from '../page/Contact';
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

let router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path:'',
        element:(
          <RequireAuth>
            <Home/>
          </RequireAuth>
        )
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/recipes/create',
        element: <RecipeForm/>
      },
      {
        path:'/recipes/edit/:id',
        element: <RecipeForm/>
      },
      {
        path:'/recipes/:id',
        element: <RecipeDetail/>
      },
      {
        path:'/user/favoriteRecipes',
        element: <FavoriteRecipes/>
      },
      {
        path:'/user-profile',
        element: <UserProfile/>
      },
      {
        path:'/user-profilePicture',
        element: <ProfilePicture/>
      },
      {
        path:'/user-email&name',
        element: <EmailAndName/>
      },
      {
        path:'/user-password',
        element: <UpdatePassword/>
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
  }
]);

export default router;