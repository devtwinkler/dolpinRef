import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import TableHeading from "@/Components/TableHeading.jsx";

const PROJECT_STATUS = {

    'pending': {'class':'badge-primary badge-outline','text':'Pending'},
    'in_progress': {'class':'badge-secondary badge-outline','text':'In Progress'},
    'completed':  {'class':'badge-success badge-outline','text':'Completed'},
    'cancelled':  {'class':'badge-error badge-outline','text': 'Canceled'},
}
export default function ShowProject({auth,projects,success,queryParams= null}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name,value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }
        router.get(route('project.index',queryParams))

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
        router.get(route('project.index',queryParams))
    }
    const deleteProject = (project) => {
        if(!window.confirm("Are you sure you want to delete the project?")){
            return;
        }
        router.delete(route("project.destroy",project.id))
    }
    return (
        <Authenticated user={auth.user}
                       header={
                           <div className="flex justify-between items-center">
                               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                   Projects
                               </h2>
                               <Link  href={route('project.create')} className="btn btn-info btn-outline"> Add Project </Link>
                           </div>

                       }
        >
            <Head title="Projects"/>

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
                                    <th className="px-3 py-2">Image</th>
                                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="name"  sortChanged={() => sortChanged('name')} >
                                        Name
                                    </TableHeading>
                                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="status"  sortChanged={() => sortChanged('status')} >
                                        Status
                                    </TableHeading>

                                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_at"  sortChanged={() => sortChanged('created_at')} >
                                     Created Date
                                    </TableHeading>
                                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="due_date"  sortChanged={() => sortChanged('due_date')} >
                                        Due Date
                                    </TableHeading>
                                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_by"  sortChanged={() => sortChanged('created_by')} >
                                        Created By
                                    </TableHeading>
                                    <th className="px-3 py-2 text-right">Actions</th>

                                </tr>
                                </thead>
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"><TextInput className="w-full" default={queryParams.name} placeholder="Project Name" onBlur={e => searchFieldChanged('name',e.target.value)} onKeyPress={e => onKeyPress('name',e)}/></th>
                                    <th className="px-3 py-2">
                                        <SelectInput className="select w-full"
                                                     defaultValue={queryParams.status}
                                                     onChange={e => searchFieldChanged('status', e.target.value)}>
                                            <option value="">Select Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>


                                        </SelectInput>
                                    </th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2 text-right"></th>

                                </tr>
                                </thead>
                                <tbody>
                                {projects.data.map(project => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                        <th className="px-3 py-2">{project.id}</th>
                                        <td className="px-3 py-2"><img src={project.image_path} style={{width: 60}}
                                                                       alt={project.name}/></td>
                                        <th className="px-3 py-2"><Link href={route("project.show",project.id)} className="hover:underline text-white">{project.name}</Link></th>
                                        <td className="px-3 py-2"><span
                                            className={"badge " + PROJECT_STATUS[project.status]['class']}>{PROJECT_STATUS[project.status]['text']} </span>
                                        </td>
                                        <td className="px-3 py-2">{project.created_at}</td>
                                        <td className="px-3 py-2">{project.due_date}</td>
                                        <td className="px-3 py-2">{project.createdBy.name}</td>
                                        <td className="px-3 py-2">
                                            <div className="flex items-center">  <Link href={route('project.edit', project.id)}
                                                         className="btn btn-secondary btn-outline btn-circle">
                                                <PencilIcon />

                                            </Link>
                                                <button onClick={(e) => deleteProject(project)}
                                                      className="btn btn-danger btn-outline btn-circle lg:mx-2 sm:mt-1">
                                                    <TrashIcon />
                                                </button>
                                            </div>


                                        </td>


                                    </tr>
                                ))}

                                </tbody>
                            </table>
                            </div>
                            <Pagination links={projects.meta.links}/>

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
