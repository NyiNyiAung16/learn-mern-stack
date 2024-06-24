import { Link } from "react-router-dom";
import SponseredBy from "./SponseredBy";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function Banner() {
    let { user } = useContext(AuthContext);

    return (
        <div className="h-[87vh] flex flex-col justify-between py-7">
            <div className="banner grid grid-cols-12 px-7">
                <div className="col-span-5">
                    <h1 className="text-4xl font-bold text-slate-600 text-center mb-1">Welcome to RecipeBook</h1>
                    <p className="mb-4 text-xl font-medium text-gray-500 text-center">The best place to find and share your favorite recipes</p>
                    {user && (
                        <p>You can browse through a wide variety of recipes, add your own recipes, and share them with your friends.</p>
                    )}
                    {!user && (
                        <>
                            <p className="mb-5">Create an account or log in to start exploring. You can browse through a wide variety of recipes, add your own recipes, and share them with your friends.</p>
                            <div className="flex justify-center space-x-3">
                                <Link to="/sign-in" className="px-5 py-2 rounded border-none bg-orange-500 text-white hover:bg-orange-600 transition-all">Log In</Link>
                                <Link to="/sign-up" className="px-5 py-2 rounded border-none bg-orange-500 text-white hover:bg-orange-600 transition-all">Sign Up</Link>
                            </div>
                        </>
                    )}
                </div>
                <div className="col-span-7">
                    <div className="relative h-[300px] md:h-[400px]">
                        <img src='/banner.jpg' className="rounded w-full h-full object-cover object-center absolute inset-0" alt="" />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-5 text-white">
                            <h2 className="text-3xl font-bold mb-3">Find Recipes</h2>
                            <p className="text-lg">Browse through a wide variety of recipes</p>
                            <Link to="/recipes" className="mt-3 px-5 py-2 rounded border-none bg-orange-500 text-white hover:bg-orange-600 transition-all">Explore</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <SponseredBy/>
            </div>
        </div>
    )
}

export default Banner;