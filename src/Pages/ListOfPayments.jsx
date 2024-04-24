function ListOfPayments ({name, unit, amount, status, date, paymentID, deletePayment}) {
    return(
        <main>
        <div className="border-2 border-slate-400 p-5 rounded shadow-md mt-5">
            <h4 className="font-light">Name: <b className="font-semibold me-1">{name}</b> 
            Unit: <b className="font-semibold">{unit}</b> Amount: <b className="font-semibold me-1">{amount}</b> 
            Status: <b className="font-semibold">{status}</b> Date: <b className="font-semibold">{date}</b></h4>
            <button className='rounded shadow-lg bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 
             border-red-600 hover:border-red-800 me-3 mt-3' 
            onClick={() => deletePayment(paymentID,amount)}>Delete Payment</button>

        </div>
        </main>
    )
}
export default ListOfPayments;