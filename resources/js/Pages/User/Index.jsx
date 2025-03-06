import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import TableHeading from "@/Components/TableHeading.jsx";

const user_STATUS = {

    'pending': {'class':'badge-primary badge-outline','text':'Pending'},
    'in_progress': {'class':'badge-secondary badge-outline','text':'In Progress'},
    'completed':  {'class':'badge-success badge-outline','text':'Completed'},
    'cancelled':  {'class':'badge-error badge-outline','text': 'Canceled'},
}
export default function Showuser({auth,users,success,queryParams= null}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name,value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }
        router.get(route('user.index',queryParams))

    }
    const onKeyPress = (name,e) => {
        if(e.key != "Enter") return;
        searchFieldChanged(name,e.target.value)
    }
    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc'
            }else{
                queryParams.sort_direction = 'asc'
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';

        }
        console.log(queryParams);
        router.get(route('user.index',queryParams))
    }
    const deleteuser = (user) => {
        if(!window.confirm("Are you sure you want to delete the user?")){
            return;
        }
        router.delete(route("user.destroy",user.id))
    }
    return (
        <Authenticated user={auth.user}
                       header={
                           <div className="flex justify-between items-center">
                               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                   Users
                               </h2>
                               <Link  href={route('user.create')} className="btn btn-info btn-outline"> Add user </Link>
                           </div>

                       }
        >
            <Head title="Users"/>

            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div role="alert" className="alert alert-success mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>{success}</span>
                        </div>
                    )}
                    <div className="bg-white mt-3 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="overflow-x-auto">


                                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="id"  sortChanged={() => sortChanged('id')} >
                                            ID
                                        </TableHeading>

                                        <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="name"  sortChanged={() => sortChanged('name')} >
                                            Name
                                        </TableHeading>
                                        <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="email"  sortChanged={() => sortChanged('email')} >
                                            Email
                                        </TableHeading>

                                        <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_at"  sortChanged={() => sortChanged('created_at')} >
                                            Created Date
                                        </TableHeading>

                                        <th className="px-3 py-2 text-right">Actions</th>

                                    </tr>
                                    </thead>
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>

                                        <th className="px-3 py-2"><TextInput className="w-full"
                                                                             default={queryParams.name}
                                                                             placeholder="User Name"
                                                                             onBlur={e => searchFieldChanged('name', e.target.value)}
                                                                             onKeyPress={e => onKeyPress('name', e)}/>
                                        </th>
                                        <th className="px-3 py-2">
                                            <TextInput className="w-full"
                                                       defaultValue={queryParams.email}
                                                       onChange={e => searchFieldChanged('email', e.target.value)}/>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>


                                    </tr>
                                    </thead>

                                    <tbody>
                                    {users.data.map(user => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={user.id}>
                                            <th className="px-3 py-2">{user.id}</th>

                                            <th className="px-3 py-2">{user.name}</th>
                                            <td className="px-3 py-2"><span
                                                className="">{user.email}</span>
                                            </td>
                                            <td className="px-3 py-2">{user.created_at}</td>

                                            <td className="px-3 py-2">
                                                <div className="flex items-center"><Link
                                                    href={route('user.edit', user.id)}
                                                    className="btn btn-secondary btn-outline btn-circle">
                                                    <PencilIcon/>

                                                </Link>
                                                    <button onClick={(e) => deleteuser(user)}
                                                            className="btn btn-danger btn-outline btn-circle lg:mx-2 sm:mt-1">
                                                        <TrashIcon/>
                                                    </button>
                                                </div>


                                            </td>


                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links}/>

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
