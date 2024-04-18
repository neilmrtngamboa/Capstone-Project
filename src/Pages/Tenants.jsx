
function Tenants({ firstname, lastname, unit, deleteTenant, tenantID, setUpdate, date, timeEdited }) {
    return (
        <>
            {
                timeEdited ?
                    (
                        <div>
                            <h5 className="text-lg font-light">{firstname} {lastname}</h5>
                            <h5 className="text-lg">Unit: <b>{unit}</b></h5>
                            <span className="text-md font-light">Edited at: </span>
                            <span className="text-md font-semibold">{date}</span>

                            <div className="mt-3">
                                <button className='rounded shadow-lg bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 
                                border-red-600 hover:border-red-800 me-2'
                                    onClick={() => deleteTenant(tenantID)}>Delete</button>
                                <button className='rounded shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 border-b-4 
                                border-emerald-600 hover:border-emerald-800'
                                    onClick={() => setUpdate(tenantID, firstname, lastname, unit)}>Update</button>
                            </div>


                        </div>
                    )
                    :
                    (
                        <div>
                            <h5 className="text-lg font-light">{firstname} {lastname}</h5>
                            <h5 className="text-lg">Unit: <b>{unit}</b></h5>

                            <div className="grid grid-cols-2 gap-5 mt-3">
                                <button className='rounded shadow-lg bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 
                                border-red-600 hover:border-red-800'
                                    onClick={() => deleteTenant(tenantID)}>Delete</button>
                                <button className='rounded shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 border-b-4 
                                border-emerald-600 hover:border-emerald-800'
                                    onClick={() => setUpdate(tenantID, firstname, lastname, unit)}>Update</button>
                            </div>

                        </div>
                    )

            }

        </>
    )
}
export default Tenants;