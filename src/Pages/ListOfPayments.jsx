function ListOfPayments ({name, unit, amount, status, date, paymentID, deletePayment}) {
    return(
        <>
        <div className="border-1 border-black">
            <p>Name: {name} Unit: {unit} Amount: {amount} Status: {status} Date: {date}</p>
            <button className='border-1 border-black p-1 bg-red-500 hover:bg-red-700' 
            onClick={() => deletePayment(paymentID,amount)}>Delete Payment</button>

        </div>
        </>
    )
}
export default ListOfPayments;