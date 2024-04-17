
function Tenants ({firstname, lastname, unit, deleteTenant, tenantID, setUpdate, date,timeEdited}) {
    return(
        <>
        {
            timeEdited ? 
            (
            <div>
                <h5>{firstname} {lastname} {unit}</h5>
                <p>Edited at: {date}</p>
                <button className='border-2 border-black p-1 bg-red-500 hover:bg-red-600' 
                onClick={() => deleteTenant(tenantID)}>Delete</button>
                <button className='border-2 border-black p-1 bg-green-500 hover:bg-green-800' 
                onClick={() => setUpdate(tenantID,firstname,lastname,unit)}>Update</button>

            </div>
            )
            :
            (
            <div>
                <h5>{firstname} {lastname} {unit}</h5>
                <button className='border-2 border-black p-1 bg-red-500 hover:bg-red-600' 
                onClick={() => deleteTenant(tenantID)}>Delete</button>
                <button className='border-2 border-black p-1 bg-green-500 hover:bg-green-800' 
                onClick={() => setUpdate(tenantID,firstname,lastname,unit)}>Update</button>

            </div>
            )

        }

        </>
    )
}
export default Tenants;