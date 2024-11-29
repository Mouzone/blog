import React, {useEffect, useState} from "react";
import Link from "next/link";

interface Account {
    id: number,
    username: string,
}

export default function Search(){
    const [searchTerm, setSearchTerm] = useState("")
    const [accounts, setAccounts] = useState<Account[]>([])
    useEffect(() => {
        async function fetchAccounts() {
            const response = await fetch('/api/accounts')
            const data = await response.json()
            const accounts = data["accounts"]
            setAccounts(accounts)
        }

        fetchAccounts()
    }, [accounts])


    const filteredAccounts = accounts
        ? accounts.filter(account => account.username.includes(searchTerm))
        : accounts
    return <div className="relative w-60">
        <input
            id="search"
            name="search"
            type="search"
            value={searchTerm}
            placeholder="Search other users"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm/6"
        />
        <div className="absolute flex flex-col z-10 w-full bg-white shadow-md max-h-40 overflow-y-auto rounded-md mt-1">
            {searchTerm && filteredAccounts && filteredAccounts.map(account => {
                return <Link
                    key={account.id}
                    href={`/account/${account.id}`}
                    className="p-2 hover:bg-gray-100"
                    onClick={() => setSearchTerm("")}
                >
                    {account.username}
                </Link>
            })}
        </div>
    </div>
}