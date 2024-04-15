import { Link } from "react-router-dom";


function Payments () {
    return (
        <>
        <h1>This is the payments page</h1>
        <Link to='/' className='text-blue-500 underline hover:no-underline hover:text-blue-700'>Owner Dashboard</Link>
        </>
    )
}
export default Payments;