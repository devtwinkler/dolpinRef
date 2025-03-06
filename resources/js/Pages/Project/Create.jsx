import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Create({auth}){
   const {data,setData,post,errors,reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''
    });
   const onSubmit = (e) => {
       e.preventDefault();
       post(route('project.store'))
   }
    return(
        <Authenticated user={auth.user}
                       header={
                           <div className="flex justify-between items-center">
                               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                   Create New Project
                               </h2>

                           </div>

                       }>

        <Head title="Create New Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit}
                                  className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div className="mt-2">
                                    <InputLabel
                                        htmlFor="project_image_path"
                                        value="Project Image"
                                    />
                                    <TextInput
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("image", e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="projectName" value="Project Name"/>
                                    <TextInput id="projectName" type="text" name="name" value={data.name}
                                               className="mt-1 block w-full p-5"
                                               isFocused={true}
                                               placeholder={"Project Name"}
                                               onChange={e => setData('name', e.target.value)}/>
                                    <InputError message={errors.name} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="projectName" value="Project Description"/>
                                    <TextAreaInput id="projectName" type="text" name="name" value={data.description}
                                               className="mt-1 block w-full p-5"

                                               placeholder={"Project Description"}
                                               onChange={e => setData('description', e.target.value)}/>
                                    <InputError message={errors.name} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="projectDueDate" value="Project Deadline" />
                                    <TextInput id="projectDueDate"
                                               name="due_date" value={data.due_date}
                                               className="mt1 block w-full"
                                               type="date"
                                               onChange={(e) => setData("due_date",e.target.value)} />
                                    <InputError message={errors.due_date} className="mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="projectStatus" value="Project Status" />
                                    <SelectInput name="status"
                                                 id="projectStatus"
                                                 className="mt-1 block w-full"
                                                 onChange={(e) => setData("status",e.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>

                                    </SelectInput>
                                    <InputError message={errors.name} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-4 text-right" >
                                    <button className="btn btn-secondary btn-outline mx-2 " type="submit">
                                        Create Project
                                    </button>
                                    <Link href={route("project.index")} className="btn btn-error btn-outline">
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
