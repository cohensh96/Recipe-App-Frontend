import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {FaClock} from 'react-icons/fa';
import useImage from '../hooks/useImage';
const RecipesPage = () => {
  const getImage = useImage;
  const [recipes, setRecipes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      //get request
      const response = await fetch("http://localhost:3500/recipe");
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      setRecipes(data);
    };
    fetchData();
  }, []);
  return (
    <div className="sorted-recipes-layout allRecipes">
      <div className="bg-orange-500">
        <div className="pt-5 px-4 md:px-2 md:max-w-4xl mx-auto text-center"></div>
        <header className="pt-3 pb-12 px-4 md:pt-5 md:pb-28 md:px-2 md:max-w-4xl mx-auto text-center">
          <h1 className="text-center text-white text-5xl md:text-7xl mb-4 md:mb-8">
            Recipes
          </h1>
          <p className=" font-bold my-0 text-white md:text-xl">
            Dietary restrictions, weeknight dinners, meal prep recipes, some of
            our most tried-and-true… no matter how you browse, we’re sure you’ll
            find just what you were looking for.
          </p>
        </header>
      </div>
      <section className="bg-white py-8 pb-8 pt-4 px-4 mx-auto md:max-w-5xl">
        <header className="max-w-xl md:mx-auto text-center">

          <div className="flex justify-center items-center space-x-2 mb-4 mt-4">
          <img className="mb-6" src="../images/recipe-icon.png"></img>
            <h2 className="mb-6 font-sans font-bold tracking-widest text-2xl uppercase text-orange-500 m-0">
            All Recipes
            </h2>
          </div>
        </header>

        <div className="container mx-auto grid md:grid-cols-2 pt-4 pb-12">
          {isLoading && <p>Loading..</p>}
          {recipes &&
            !isLoading &&
              recipes.map((recipe) => (
          //     <div className="md:h-full mb-4 p-6 flex flex-wrap w-full bg-white rounded overflow-hidden shadow-lg hover:grow hover:shadow-lg  hover:ring-2 hover:ring-orange-500 hover:ring-opacity-50" key={recipe._id}>
          //         <NavLink to={`/recipe/${recipe._id}`} state={{id:recipe._id}} className="flex md:flex-row flex-col">
          //         <div className="mt-4 w-full hover:grow hover:shadow-lg md:w-1/3 rounded-t">
          //         <img
          //           className="hover:grow hover:shadow-lg w-400 h-500 rounded"
          //           src= {`http://localhost:3500/${(recipe.Image).replace('uploads/', '')}`}
          //           alt="Picutre of Recipe"
          //         ></img>
          //         </div>
          //         <div className="w-full md:w-2/3 flex flex-col flex-grow flex-shrink">

          //         <div className=" flex justify-end  w-20 top-0 right-0 mt-4 ml-5 bg-orange-500 text-black rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase  flex justify-center items-center">
          //   <span className=" flex items-center font-bold text-bkack" >{recipe.recipeDifficulty}</span>
          // </div>


          //         <p className=" font-bold text-orange-400  md:text-2xl pt-6 px-6">{recipe.recipeName}</p>
          //         <p className="pt-1 font-bold text-gray-900 pt-2 px-6">Author:{recipe.author}</p>
          //         <p className="font-bold text-gray-600 text-xs md:text-sm pt-3 px-6">{recipe.recipeDescription.substring(0, 100)} 
          //         <u> Read more...</u></p>

          //         <div className="flex justify-end mt-4 mb-4 text-gray-500">
          //     <div className="flex items-center">
          //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          //       </svg>
          //       <span className="ml-1 lg:text-xl">{recipe.recipeTime}</span>
          //     </div>
          //     <div className="flex items-center">
          //       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          //         <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
          //         <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
          //       </svg>
          //       <span className="ml-1 lg:text-xl">{recipe.recipeIngredients.length}</span>
          //     </div>
          //   </div>  
          //     </div>
          //     </NavLink>
          //     </div>
          //`background-image: url(${getImage(recipe.Image)}); background-position: center center; background-blend-mode: multiply; background-size: cover;`
          <div
          class="transition-all duration-150 flex w-full px-4 py-6 h-full"
        >
          <div
            class="flex flex-col items-stretch w-full min-h-full pb-4 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl"
          >
            <div class="md:flex-shrink-0">
              <img
                src={getImage(recipe.Image)}
                alt="Blog Cover"
                class=" object-cover w-full rounded-lg rounded-b-none md:h-56"
              />
            </div>
            <div class="flex items-center justify-between px-4 py-2 overflow-hidden">
              <span class="text-xs font-medium text-blue-600 uppercase">
                {recipe.recipeDifficulty}
              </span>
              <div class="flex flex-row items-center">
                <div
                  class="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  <span>{recipe.recipeComments}</span>
                </div>
      
                <div
                  class="text-xs font-medium text-gray-500 flex flex-row items-center"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                  <span>{recipe.recipeRating}</span>
                </div>
              </div>
            </div>
            <hr class="border-gray-300" />
            <div class="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
              <NavLink to={`/recipe/${recipe._id}`} state={{id:recipe._id}} className="hover:underline">
                <h2 class="text-2xl font-bold tracking-normal text-gray-800">
                  {recipe.recipeName}
                </h2>
              </NavLink>
            </div>
            <hr class="border-gray-300" />
            <p
              class="flex flex-col flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700"
            >
              {recipe.recipeDescription.substring(0, 100)}...
              <NavLink to={`/recipe/${recipe._id}`} state={{id:recipe._id}} className="inline-flex mt-2 items-center space-x-2 text-sm text-orange-400">
                <span>Read more</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </NavLink>
            </p>
            <hr class="border-gray-300" />
            <section class="px-4 py-2 mt-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1">
                  <img
                    class="object-cover h-10 rounded-full"
                    src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                    alt="Avatar"
                  />
                  <div class="flex flex-col mx-2">
                    <a href="" class="font-semibold text-gray-700 hover:underline">
                      {recipe.author}
                    </a>
                    <span class="mx-1 text-xs text-gray-600">{new Date(recipe.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <p class="mt-1 text-xs text-gray-600 flex items-center justify-center"><FaClock className="mr-1"/> {recipe.recipeTime}</p>
              </div>
            </section>
            <hr class="border-gray-300" />
            <div class="flex flex-1 items-center justify-center flex-wrap px-4 py-1 text-center mx-auto">
              {(recipe.recipeCategorys).map((category, index) => 
                  <span class="px-2 py-1 m-1 text-xs rounded-full dark:bg-orange-400"key={index}>{category}</span>
              )}
            </div>
          </div>
        </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default RecipesPage;
