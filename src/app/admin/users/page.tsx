import AdminTables from "@/components/adminTAble"

export default function AdminUsers() {

    return <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg rounded">
                    <AdminTables />
                </div>
            </div>
        </div>
    </div>

}