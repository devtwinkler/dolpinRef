import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, notifications,pendingTasksCount,userPendingTasksCount,inProgressTasksCount,userInProgressTasksCount,completedTasksCount,userCompletedTasksCount }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl text-error">Pending Tasks</h3>
                            <p className="text-xl  "><span className="mr-2">{userPendingTasksCount}</span> / <span
                                className="mr-2">{pendingTasksCount}</span></p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl text-warning">In Progress Task</h3>
                            <p className="text-xl"><span className="mr-2">{userInProgressTasksCount}</span> / <span
                                className="mr-2">{inProgressTasksCount}</span></p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl text-success">Completed Task</h3>
                            <p className="text-xl"><span className="mr-2">{userCompletedTasksCount}</span> / <span
                                className="mr-2">{completedTasksCount}</span></p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-5 ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl text-success">My Activity</h3>
                            {!notifications && (
                                <h1>No Activity found</h1>
                            )}
                            {notifications.map((notification) => (
                                <div className={"mt-5 bg-gray-900 p-5 rounded-lg border-2 border-" + notification.data.type} key={notification.data.id}>
                                    <h1>{notification.data.message}</h1>


                                </div>


                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
