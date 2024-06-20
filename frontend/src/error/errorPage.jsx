const ErrorPage = (e) => {
    console.log(e)
    return (
        <div>
            <h1>{e.message}</h1>
        </div>
    )
}

export default ErrorPage;