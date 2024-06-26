import { Outlet, Link, useNavigate } from "react-router-dom";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function Layout() {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const [authenticated, setAuthentication] = useState(false)

    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {            //Authentication
            if (user) {
                setAuthentication(true)
                const uid = user.uid;
            } else {
                navigate('/login');
            }
        });

    }, [])

    const Logout = () => {                          //Logout function
        signOut(auth).then(() => {
            navigate('/login');                     //navigate to login page if logged out
        })
        setAuthentication(false)

    }

    return (

        <div className={`${darkMode && 'dark'}`}>

            <div className="bg-indigo-50 dark:bg-zinc-600">
                <nav class="flex items-center justify-between flex-wrap bg-indigo-500 dark:bg-indigo-950 p-6">

                    <div class="flex items-center flex-shrink-0 text-white mr-6">
                        <span class="font-semibold text-xl tracking-tight">Apartment Management System</span>
                    </div>

                    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">

                        <div class="text-sm lg:flex-grow">
                            {
                                authenticated ?     //Return value if the user is authenticated
                                    <>
                                        <Link to='/' class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-violet-800 mr-4">
                                            Units Overview
                                        </Link>
                                        <Link to='/showpayments' class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-violet-800 mr-4">
                                            Payments
                                        </Link>
                                        <Link to='/payments' class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-violet-800 mr-4">
                                            Manage Payments
                                        </Link>
                                        <Link to='/managetenants' class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-violet-800 mr-4">
                                            Manage Tenants
                                        </Link>
                                    </>
                                    :
                                    <></>
                            }
                        </div>

                        {
                            authenticated ? //Return value if the user is authenticated
                                <div>
                                    <button onClick={Logout} class="inline-block text-sm px-4 py-2 leading-none border rounded 
                                    text-white border-white hover:border-transparent hover:text-violet-800 hover:bg-white 
                                mt-4 lg:mt-0">Log out</button>

                                    <button className="inline-block text-sm px-4 py-2 leading-none ms-2
                                    hover:text-violet-800 hover:bg-white 
                                    mt-4 lg:mt-0 bg-neutral-900 rounded-full text-white dark:text-black dark:bg-white"
                                        onClick={toggleDarkMode}>
                                        {darkMode ? 'LHT' : 'DRK'}
                                    </button>
                                </div>
                                :
                                <></>
                        }

                    </div>
                </nav>

                <div>
                    <Outlet></Outlet>

                </div>



                <footer class="bg-transparent mt-60">
                    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                        {
                            authenticated ? //Return value if the user is authenticated
                                <div class="sm:flex sm:items-center sm:justify-between">
                                    <Link to='/' class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse hover:text-violet-900">
                                        <span class="self-center lg:text-2xl sm:text-xl font-semibold whitespace-nowrap text-gray-400">
                                            Apartment Management System</span>
                                    </Link>
                                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
                                        <li>
                                            <a href="https://github.com/neilmrtngamboa" target="blank" class="hover:underline me-4 md:me-6">GitHub</a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/neilmartingamboa/" target="blank" class="hover:underline me-4 md:me-6">LinkedIn</a>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <></>
                        }
                        <hr class="my-6 border-slate-200 sm:mx-auto lg:my-8" />
                        <span class="block text-sm text-gray-500 sm:text-center ">© 2024. Developed by: Neil Martin Gamboa</span>
                    </div>
                </footer>
            </div>

        </div>
    )
}
export default Layout;