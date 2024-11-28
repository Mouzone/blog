import Input from "@/app/(pages)/components/Input.tsx";
import {useEffect, useState} from "react";

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

    const filteredAccounts = accounts.filter(account => account.username.includes(searchTerm))
    return <div>
        <Input type="search" value={searchTerm} update={setSearchTerm}/>
        <div className="absolute bg-white">
            {searchTerm && filteredAccounts.map(account => {
                return <div className="p-2" key={account.id}>
                    {account.username}
                </div>
            })}
        </div>
    </div>
}