import { Link, NavLink } from "react-router-dom";
function Contact() {
  return (
    <div className="bg-gray-200 py-3 mt-5">
      <div className="grid grid-cols-12 px-5">
        <div className="col-span-4">
          <h3 className="text-orange-500 font-bold text-lg">{import.meta.env.VITE_APP_NAME}</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet earum obcaecati neque magnam, sequi odio?</p>
        </div>
        <ul className="col-span-4 flex items-center flex-col gap-1 list-none">
          <li>
            <NavLink to="/" className="hover:text-orange-500 font-medium">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:text-orange-500 font-medium">
              About
            </NavLink>
          </li> 
          <li>
            <NavLink
              to="/recipes"
              className="hover:text-orange-500 font-medium"
            >
              Recipes
            </NavLink>
          </li>
        </ul>
        <div className="col-span-4 flex items-end flex-col gap-1">
          <h4 className="text-xl font-semibold text-gray-500 mb-2 underline">Contact</h4>
          <p>Email: {import.meta.env.VITE_APP_EMAIL}</p>
          <p>Phone: {import.meta.env.VITE_APP_PHONE_NUMBER}</p>
          <div className="flex gap-3 items-center">
            <Link
              to="https://www.facebook.com/"
              target="_blank"
              className="flex flex-col items-center"
            >
              <i className="fa-brands fa-facebook text-2xl hover:text-[30px] duration-200 text-blue-500"></i>
            </Link>
            <Link
              to="https://www.messenger.com/"
              target="_blank"
              className="flex flex-col items-center"
            >
              <i className="fa-brands fa-facebook-messenger text-2xl hover:text-[30px] duration-200 text-blue-500"></i>
            </Link>
            <Link
              to="https://www.viber.com/"
              target="_blank"
              className="flex flex-col items-center"
            >
              <i className="fa-brands fa-viber text-2xl hover:text-[30px] duration-200 text-violet-500"></i>
            </Link>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              className="flex flex-col items-center"
            >
              <i className="fa-brands fa-instagram text-2xl hover:text-[30px] duration-200 text-orange-500"></i>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-lg">Copy Right &copy; {new Date().getFullYear()} by {import.meta.env.VITE_APP_NAME}</p>
    </div>
  );
}

export default Contact;
