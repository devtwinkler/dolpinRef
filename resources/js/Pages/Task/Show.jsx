import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const PROJECT_STATUS = {

    'pending': {'class':'badge-primary badge-outline','text':'Pending'},
    'in_progress': {'class':'badge-secondary badge-outline','text':'In Progress'},
    'completed':  {'class':'badge-success badge-outline','text':'Completed'},
    'cancelled':  {'class':'badge-error badge-outline','text': 'Canceled'},
}
export default function Show({auth,task}){
    console.log(task.data)
    return(
        <Authenticated user={auth.user}
                       header={<h2
                           className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`Task "${task.data.name}"`}</h2>}
        >
            <Head title={`Task "${task.data.name}"`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img src={task.data.image_path} alt={task.data.name} className="w-full h-64 object-cover"/>
                        </div>

                        <div className="grid gap-1 grid-cols-2 mt-2">
                            <div className="mx-3">
                                <div>
                                    <label className="font-bold text-lg">Task ID</label>
                                    <p className="mt-1">{task.data.id}</p>
                                </div>
                                <div className={"mt-4"}>
                                    <label className="font-bold text-lg">Task Name</label>
                                    <p className="mt-1">{task.data.name}</p>
                                </div>
                                <div className={"mt-4"}>
                                    <label className="font-bold text-lg">Task Status</label>
                                    <p className="my-2"><span
                                        className={"badge badge-lg " + PROJECT_STATUS[task.data.status]['class']}>{PROJECT_STATUS[task.data.status]['text']}</span>
                                    </p>
                                </div>
                                <div className={"mt-4"}>
                                    <label className="font-bold text-lg">Task Created By</label>
                                    <p className="my-2">{task.data.createdBy.name}</p>
                                </div>
                            </div>

                            <div className="mx-3">
                                <div>
                                    <label className="font-bold text-lg">Due Date</label>
                                    <p className="mt-1">{task.data.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Created At</label>
                                    <p className="mt-1">{task.data.created_at}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Updated By</label>
                                    <p className="mt-1">{task.data.updatedBy.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mx-3">
                            <label className="font-bold text-lg">Task Description</label>
                            <p className="mt-1">{task.data.description}</p>
                        </div>

                    </div>
                </div>
            </div>



        </Authenticated>
    )
}
