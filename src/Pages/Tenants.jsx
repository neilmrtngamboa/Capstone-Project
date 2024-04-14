
function Tenants ({firstname, lastname, unit}) {
    return(
        <>
        <div>
            <h5>{firstname} {lastname} {unit}</h5>
            <button className='border-2 border-black p-1 bg-red-500 hover:bg-red-600'>Delete</button>
        </div>
        
        </>
    )
}
export default Tenants;