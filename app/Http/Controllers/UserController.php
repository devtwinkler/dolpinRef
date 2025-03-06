<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        if(request('name')){

            $query->where("name","like","%".request('name')."%");
        }
        if(request('email')){

            $query->where("email","like","%".request('email')."%");
        }

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction','desc');

        $users = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("User/Index",[
            "users" => UserResource::collection($users),
            "queryParams" => request()->query() ?: null,
            "success" => session("success"),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['email_verified_at'] = now();
        User::create($data);

        return to_route('user.index')
            ->with('success', 'User was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return inertia("User/Edit");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        return inertia('User/Edit',[
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);
        return to_route('user.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user->delete();
        return to_route("user.index")->with("success", "User ".$user->name." Deleted Successfully");
    }
}
