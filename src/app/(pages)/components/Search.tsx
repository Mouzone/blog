import Input from "@/app/(pages)/components/Input.tsx";
import {useEffect, useState} from "react";
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
    }, [])

    const filteredAccounts = accounts.filter(account => account.username.includes(searchTerm))
    return <div>
        <Input type="search" value={searchTerm} update={setSearchTerm}/>
        <div className="absolute bg-white">
            {searchTerm && accounts && filteredAccounts.map(account => {
                return <Link href={`/account/${account.id}`} className="p-2" key={account.id}>
                    {account.username}
                </Link>
            })}
        </div>
    </div>
}