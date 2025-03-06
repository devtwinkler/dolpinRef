import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import TaskTable from "@/Components/TaskTable.jsx";
const PROJECT_STATUS = {

    'pending': {'class':'badge-primary badge-outline','text':'Pending'},
    'in_progress': {'class':'badge-secondary badge-outline','text':'In Progress'},
    'completed':  {'class':'badge-success badge-outline','text':'Completed'},
    'cancelled':  {'class':'badge-error badge-outline','text': 'Canceled'},
}
export default function ProjectDetails({auth,project,tasks,queryParams}){
    console.log(tasks)
    return(
        <Authenticated user={auth.user}
                       header={<h2
                           className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`Project "${project.name}"`}</h2>}
        >
            <Head title={`Project "${project.name}"`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img src={project.image_path} alt={project.name} className="w-full h-64 object-cover"/>
                        </div>

                        <div className="grid gap-1 grid-cols-2 mt-2">
                            <div className="mx-3">
                                <div>
                                    <label className="font-bold text-lg">Project ID</label>
                                    <p className="mt-1">{project.id}</p>
                                </div>
                                <div className={"mt-4"}>
                                    <label className="font-bold text-lg">Project Name</label>
                                    <p className="mt-1">{project.name}</p>
                                </div>
                                <div className={"mt-4"}>
                                    <label className="font-bold text-lg">Project Status</label>
                                    <p className="my-2"><span
                                        className={"badge badge-lg " + PROJECT_STATUS[project.status]['class']}>{PROJECT_STATUS[project.status]['text']}</span>
                                    </p>
                                </div>
                                <div className={"mt-4"}>
                                    <label className="font-bold text-lg">Project Created By</label>
                                    <p className="my-2">{project.createdBy.name}</p>
                                </div>
                            </div>

                            <div className="mx-3">
                                <div>
                                    <label className="font-bold text-lg">Due Date</label>
                                    <p className="mt-1">{project.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Created At</label>
                                    <p className="mt-1">{project.created_at}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Updated By</label>
                                    <p className="mt-1">{project.updatedBy.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mx-3">
                            <label className="font-bold text-lg">Project Description</label>
                            <p className="mt-1">{project.description}</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                       <div className="p-6 text-gray-900 dark:text-gray-100">
                        <TaskTable tasks={tasks} queryParams={queryParams} />
                       </div>



                    </div>
                </div>
            </div>

        </Authenticated>
    )
}
