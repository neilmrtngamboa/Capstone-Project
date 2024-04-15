function ListOfPayments ({name, unit, amount, status, date, paymentID}) {
    return(
        <>
        <div className="border-1 border-black">
            <p>{name} {unit} {amount} {status} {date}</p>

        </div>
        </>
    )
}
export default ListOfPayments;