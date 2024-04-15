function ListOfPayments ({name, unit, amount, status, date, paymentID}) {
    return(
        <>
        <div className="border-1 border-black">
            <p>{name} {unit} {amount} {status} {date}</p>
            <button className='border-1 border-black p-1 bg-red-500 hover:bg-red-700'>Delete Payment</button>

        </div>
        </>
    )
}
export default ListOfPayments;