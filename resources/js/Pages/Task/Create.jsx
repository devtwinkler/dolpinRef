import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Create({auth,projects,users}){
    const {data,setData,post,errors,reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: '',
        priority: '',
        assigned_user_id: '',
        project_id: ''
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('task.store'))
    }
    return(
        <Authenticated user={auth.user}
                       header={
                           <div className="flex justify-between items-center">
                               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                   Create New Task
                               </h2>

                           </div>

                       }>

            <Head title="Create New Task" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit}
                                  className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div className="mt-2">
                                    <InputLabel
                                        htmlFor="task_image_path"
                                        value="Task Image"
                                    />
                                    <TextInput
                                        id="task_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("image", e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="taskName" value="Task Name"/>
                                    <TextInput id="taskName" type="text" name="name" value={data.name}
                                               className="mt-1 block w-full p-5"
                                               isFocused={true}
                                               placeholder={"Task Name"}
                                               onChange={e => setData('name', e.target.value)}/>
                                    <InputError message={errors.name} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="taskName" value="Task Description"/>
                                    <TextAreaInput id="taskName" type="text" name="name" value={data.description}
                                                   className="mt-1 block w-full p-5"

                                                   placeholder={"Task Description"}
                                                   onChange={e => setData('description', e.target.value)}/>
                                    <InputError message={errors.name} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="taskDueDate" value="Task Deadline"/>
                                    <TextInput id="taskDueDate"
                                               name="due_date" value={data.due_date}
                                               className="mt1 block w-full"
                                               type="date"
                                               onChange={(e) => setData("due_date", e.target.value)}/>
                                    <InputError message={errors.due_date} className="mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="taskStatus" value="Task Status"/>
                                    <SelectInput name="status"
                                                 id="taskStatus"
                                                 className="mt-1 block w-full"
                                                 onChange={(e) => setData("status", e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>

                                    </SelectInput>
                                    <InputError message={errors.status} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="taskPriority" value="Task Priority"/>
                                    <SelectInput name="priority"
                                                 id="taskPriority"
                                                 className="mt-1 block w-full"
                                                 onChange={(e) => setData("priority", e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>

                                    </SelectInput>
                                    <InputError message={errors.priority} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="taskAssignedUser" value="Task Assigned User"/>
                                    <SelectInput name="task_assigned_user"
                                                 id="taskAssignedUser"
                                                 className="mt-1 block w-full"
                                                 onChange={(e) => setData("assigned_user_id", e.target.value)}
                                    >
                                        <option value="">Select User</option>
                                        {users.data.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}



                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="taskProjectId" value="Project"/>
                                    <SelectInput name="project_id"
                                                 id="taskProjectId"
                                                 className="mt-1 block w-full"
                                                 onChange={(e) => setData("project_id", e.target.value)}
                                    >
                                        <option value="">Select Project</option>
                                        {projects.data.map((project) => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))}

                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} className=" mt-2 text-error"/>
                                </div>


                                <div className="mt-4 text-right">
                                    <button className="btn btn-secondary btn-outline mx-2 " type="submit">
                                        Create Task
                                    </button>
                                    <Link href={route("task.index")} className="btn btn-error btn-outline">
                                        Cancel
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
