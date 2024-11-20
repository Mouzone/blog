export default function Login() {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <Header/>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="/api/log-in" method="POST" className="space-y-6">
                        <Input value="username"/>
                        <Input value="password"/>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

function Header() {
    return <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log in to your account
        </h2>
    </div>
}

function Input({value}: { value: string}) {
    return <div>
        <label htmlFor={value} className="block text-sm/6 font-medium text-gray-900">
            {value.at(0)?.toUpperCase() + value.substring(1)}
        </label>
        <div className="mt-2">
            <input
                id={value}
                name={value}
                type={value}
                required
                autoComplete={value}
                className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm/6"
            />
        </div>
    </div>
}