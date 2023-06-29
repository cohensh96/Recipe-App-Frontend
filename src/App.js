import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider
 
} from 'react-router-dom'

import './App.css';

//Layouts
import SortedRecipesLayout from './layouts/SortedRecipesLayout'
import RootLayout from './layouts/RootLayout'

// Auth
import RequireAuth from './components/RequireAuth';
//Pages
import RecipesPage from './pages/RecipesPage';
import HomePage from './pages/HomePage.js'
import ErrorPage from './pages/ErrorPage.js'
import SortedRecipes from './pages/SortedRecipes.js'
import CreateRecipe from './pages/CreateRecipe';
import Profile from './pages/Profile';
import RecipePage from './pages/RecipePage'
import AboutUsPage from './pages/AboutUsPage'
import EditRecipe from './pages/EditRecipe';
import PersistLogin from './components/PersistLogin';
import SearchPage from './pages/searchPage';
import StartHerePage from './pages/StartHerePage';
import UpdateProfile from './pages/UpdateProfile.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PersistLogin/>}>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="category">
        <Route element={<SortedRecipes />} 
        path=":sortedByCategory" 
      />
      </Route>
      <Route path='recipe'>
        <Route index element={<RecipesPage />} />
        <Route path=':id' element={<RecipePage/>}/>
        <Route path='edit'>
          <Route path=':id' element={<EditRecipe/>}/>
        </Route>
      </Route>
        <Route element ={<RequireAuth/>}>
          <Route path="CreateRecipe" element={<CreateRecipe />} />
          <Route oute path='profile' element={<Profile/>}/>
          <Route path='updateProfile'>
             <Route path=':id' element={<UpdateProfile/>}/>
          </Route>
       
       
         
        </Route>
  
      <Route path='StartHere' element={<StartHerePage/>}/>
      <Route path='AboutUs' element={<AboutUsPage/>}/>
      <Route path='SearchRecipe' element={<SearchPage/>}/>
      <Route path="*" element={<ErrorPage />} />

      </Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;
