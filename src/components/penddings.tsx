'use client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function PenddingComponent() {
    const doToast = (message: string) => toast(message)
    const [out, setOut] = useState<any[]>([])
    const [comin, setComin] = useState<any[]>([])
    let allHistroies



    async function getHistories() {
        allHistroies = await axios.get('/admin/pendding/api')
        sortHistories(allHistroies.data)
    }

    async function ConfrimDeposit(res: any) {
        try {
            await axios.put('/admin/pendding/api', JSON.stringify(res))
            doToast("Success")
        } catch (err) {
            doToast("An Error Occured, Try Again...")
        }

    }


    async function DeleteDeposit(id: string) {
        try {
            await axios.delete(`/admin/pendding/api?id=${id}`)
        } catch (err) {

        }
    }

    function sortHistories(histories: any) {
        setOut([])
        setComin([])
        for (const history of histories) {
            if (history.direction === 'out') {
                setOut(out => [...out, history])
            } else if (history.direction === 'in') {
                setComin(comin => [...comin, history])
            }
        }

        console.log(out, 'out')
        console.log(comin, 'in')
    }

    useEffect(() => {
        getHistories()
    }, [allHistroies])
    return <>
        <Tabs>
            <TabList>
                <Tab>Pendding Deposits</Tab>
                <Tab>Pendding Withdrawals</Tab>
            </TabList>



            <TabPanel>
                <table className="min-w-full text-sm text-gray-400">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                        <tr>
                            <th></th>
                            {/* <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Email
                            </th> */}
                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Coin
                            </th>
                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 tracking-wider text-center">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                        {comin.map((res, index) => {
                            return <tr className="bg-black bg-opacity-20" key={index}>
                                <td className="pl-4">
                                    {index + 1}
                                </td>
                                {/* <td className="flex px-6 py-4 whitespace-nowrap">
                                    <span className="ml-2 font-medium">coolmirth35@gmail.com</span>
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {res.coin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {res.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {res.createdOn}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap grid grid-cols-1 gap-5">
                                    <button className='p-2 bg-blue-900 rounded' onClick={() => ConfrimDeposit(res)}>Confirm</button>
                                    <button className='p-2 bg-blue-900 rounded' onClick={() => DeleteDeposit(res.id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </TabPanel>


            <TabPanel>
                <table className="min-w-full text-sm text-gray-400">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                        <tr>
                            <th></th>
                            {/* <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Email
                            </th> */}
                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Coin
                            </th>
                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 tracking-wider text-center">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                        {out.map((res, index) => {
                            return <tr className="bg-black bg-opacity-20" key={index}>
                                <td className="pl-4">
                                    {index + 1}
                                </td>
                                {/* <td className="flex px-6 py-4 whitespace-nowrap">
                                    <span className="ml-2 font-medium">coolmirth35@gmail.com</span>
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {res.coin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {res.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {res.createdOn}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap grid grid-cols-1 gap-5">
                                    <button className='p-2 bg-blue-900 rounded' onClick={() => ConfrimDeposit(res)}>Confirm</button>
                                    <button className='p-2 bg-blue-900 rounded' onClick={() => DeleteDeposit(res._id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </TabPanel>
        </Tabs>
        <ToastContainer />
    </>
}