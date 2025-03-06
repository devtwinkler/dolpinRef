import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, user }) {
    const { data, setData, post, errors, reset } = useForm({

        name: '' || user.data.name,
        email: '' || user.data.email,
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("user.update", user.data.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit user "{data.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Edit User" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div className="mt-2">
                                <InputLabel htmlFor="userName" value="Username"/>
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



                            <div className="mt-4 text-right">
                                <Link
                                    href={route("user.index")}
                                    className="btn btn-error btn-outline mx-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="btn  btn-primary btn-outline">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
