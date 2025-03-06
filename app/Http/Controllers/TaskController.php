<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;

use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use App\Notifications\UserTaskNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = auth()->user()->notifications;
        //
        $query = Task::query();
        if(request('name')){

            $query->where("name","like","%".request('name')."%");
        }
        if(request('status')){
            $query->where("status",request('status'));
        }
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction','desc');
        //

        $tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Task/Index",[
            'notifications' => $notifications,
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $projects = Project::query()->orderBy('name','asc')->get();
        //

        return inertia("Task/Create", [
            'users' => UserResource::collection($users),
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        User::query()->findOrFail($data['assigned_user_id'])->notify(new UserTaskNotification(auth()->user(), Str::ucfirst(auth()->user()->name)." has assigned you a task with  ".$data['priority'].'low and a deadline of '.$data['due_date'].' have a look.','success'));
//        auth()->user()->notify(new UserTaskNotification(User::query()->findOrFail($data['assigned_user_id']),
//            "User ".auth()->user()->name." has assigned you a  task with  ".$data['priority'].' have a look.','success'));
        if ($image) {
            $extension = $image->getClientOriginalExtension();
            $fileName = time().".".$extension;
//            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
            $data['image_path'] = $image->move('uploads/task/'.Str::random(),$fileName);
        }
        Task::create($data);

        return to_route('task.index')
            ->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //



        return inertia ("Task/Show",[ 'task' => new TaskResource($task),

        ]);
    }
    public function myTasks() {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //

        $users = User::all();
        $projects = Project::query()->orderBy('name','asc')->get();

        //
        return inertia("Task/Edit",["task" => new TaskResource($task), 'projects' =>  ProjectResource::collection($projects),
            'users' => UserResource::collection($users) ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        $task->update($data);
        return to_route('task.index')->with('success', 'Task '.$task->name.' updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
        $task->delete();
        return to_route("task.index")->with("success","Task deleted successfully");
    }
}
