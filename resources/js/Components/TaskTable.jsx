import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {Link, router} from "@inertiajs/react";
import {PencilIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import Pagination from "@/Components/Pagination.jsx";
const TASK_STATUS = {

    'pending': {'class':'badge-primary badge-outline','text':'Pending'},
    'in_progress': {'class':'badge-secondary badge-outline','text':'In Progress'},
    'completed':  {'class':'badge-success badge-outline','text':'Completed'},
    'cancelled':  {'class':'badge-error badge-outline','text': 'Canceled'},
}
export default function TaskTable({tasks,queryParams=null}){
    queryParams = queryParams || {};
    const searchFieldChanged = (name,value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }
        router.get(route('task.index',queryParams))

    }
    const onKeyPress = (name,e) => {
        if(e.key != "Enter") return;
        searchFieldChanged(name,e.target.value)
    }
    const deleteTask = (task) => {
        if(!window.confirm("Are you sure you want to delete the project?")){
            return;
        }
        router.delete(route("task.destroy",task.id))
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
        router.get(route('task.index',queryParams))
    }
    return (
        <>
        <div className="overflow-x-auto">


            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="text-nowrap">
                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  name="id" sortChanged={() => sortChanged('id')}>
                        ID
                    </TableHeading>
                    <th className="px-3 py-2">Image</th>
                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  name="name" sortChanged={() => sortChanged('name')}>
                        Name
                    </TableHeading>
                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  name="status" sortChanged={() => sortChanged('status')}>
                        Status
                    </TableHeading>

                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  name="created_at" sortChanged={() => sortChanged('created_at')}>
                        Created Date
                    </TableHeading>
                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  name="due_date" sortChanged={() => sortChanged('due_date')}>
                        Due Date
                    </TableHeading>
                    <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  name="created_by" sortChanged={() => sortChanged('created_by')}>
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
                    <th className="px-3 py-2"><TextInput className="w-full" default={queryParams.name}
                                                         placeholder="Project Name"
                                                         onBlur={e => searchFieldChanged('name', e.target.value)}
                                                         onKeyPress={e => onKeyPress('name', e)}/></th>
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
                {tasks.data.map(task => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                        <th className="px-3 py-2">{task.id}</th>
                        <td className="px-3 py-2"><img src={task.image_path} style={{width: 60}}
                                                       alt={task.name}/></td>
                        <td className="px-3 py-2"><Link href={route('task.show',task.id)}>{task.name} </Link></td>
                        <td className="px-3 py-2"><span
                            className={"badge " + TASK_STATUS[task.status]['class']}>{TASK_STATUS[task.status]['text']} </span>
                        </td>
                        <td className="px-3 py-2">{task.created_at}</td>
                        <td className="px-3 py-2">{task.due_date}</td>
                        <td className="px-3 py-2">{task.createdBy.name}</td>
                        <td className="px-3 py-2">
                            <div className="flex items-center"><Link href={route('task.edit', task.id)}
                                                                     className="btn btn-secondary btn-outline btn-circle">
                                <PencilIcon/>

                            </Link>
                                <button onClick={(e) => deleteTask(task)}
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
    <Pagination links={tasks.meta.links}/>
        </>
)
}
