import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth}){
    const {data,setData,post,errors,reset} = useForm({

        name: '',
        email: '',
        password: '',
        password_confirmation: '',

    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.store'))
    }
    return(
        <Authenticated user={auth.user}
                       header={
                           <div className="flex justify-between items-center">
                               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                   Create New user
                               </h2>

                           </div>

                       }>

            <Head title="Create New user" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit}
                                  className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                                <div className="mt-2">
                                    <InputLabel htmlFor="userName" value="user Name"/>
                                    <TextInput id="userName" type="text" name="name" value={data.name}
                                               className="mt-1 block w-full p-5"
                                               isFocused={true}
                                               placeholder={"Username"}
                                               onChange={e => setData('name', e.target.value)}/>
                                    <InputError message={errors.name} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="userEmail" value="Email"/>
                                    <TextInput id="userEmail" type="email" name="email" value={data.email}
                                               className="mt-1 block w-full p-5"

                                               placeholder={"Email"}
                                               onChange={e => setData('email', e.target.value)}/>
                                    <InputError message={errors.email} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="userPassword" value="Password"/>
                                    <TextInput id="userPassword" type="password" name="password" value={data.password}
                                               className="mt-1 block w-full p-5"

                                               placeholder={"Password"}
                                               onChange={e => setData('password', e.target.value)}/>
                                    <InputError message={errors.password} className=" mt-2 text-error"/>
                                </div>
                                <div className="mt-2">
                                    <InputLabel htmlFor="userConfirmPassword" value="Confirm Password"/>
                                    <TextInput id="userConfirmPassword" type="password" name="password_confirmation" value={data.password_confirmation}
                                               className="mt-1 block w-full p-5"

                                               placeholder={"Confirm Password"}
                                               onChange={e => setData('password_confirmation', e.target.value)}/>
                                    <InputError message={errors.password} className=" mt-2 text-error"/>
                                </div>


                                <div className="mt-4 text-right">
                                    <button className="btn btn-secondary btn-outline mx-2 " type="submit">
                                        Create User
                                    </button>
                                    <Link href={route("user.index")} className="btn btn-error btn-outline">
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
