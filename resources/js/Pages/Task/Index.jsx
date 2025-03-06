import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import TaskTable from "@/Components/TaskTable.jsx";


export default function Index({auth,tasks ,success,notifications,queryParams= null}) {

    console.log(notifications)
    return (
        <Authenticated user={auth.user}
                       header={
            <div className="flex items-center justify-between"><h2
                className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>
                <Link  href={route('task.create')} className="btn btn-info btn-outline"> Create Task </Link>
        </div>}
        >
            <Head title="Tasks" />
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
