<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        if(request('name')){

            $query->where("name","like","%".request('name')."%");
        }
        if(request('status')){
            $query->where("status",request('status'));
        }
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction','desc');
        //

        $projects = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Project/ShowProject",[
            "projects" => ProjectResource::collection($projects),
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
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $extension = $image->getClientOriginalExtension();
            $fileName = time().".".$extension;
//            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
            $data['image_path'] = $image->move('uploads/project/'.Str::random(),$fileName);
        }
        Project::create($data);

        return to_route('project.index')
            ->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $query = Project::query();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");
        if (request('name')){
            $query->where("name","like","%".request('name')."%");
        }
        if (request('status')){
            $query->where("status","like","%".request('status')."%");
        }

        $tasks = $query->findOrFail($id)->tasks()->orderBy($sortField,$sortDirection)->paginate(10)->onEachside(1);

        return inertia ("Project/ProjectDetails",[ 'project' => new ProjectResource(Project::findOrFail($id)),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $project = Project::query()->findOrFail($id);
        //
        return inertia("Project/Edit",["project" => new ProjectResource($project)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }

        $project->update($data);
        return to_route('project.index')->with('success', 'Project updated successfully.');
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        Project::destroy($id);
        return to_route('project.index')->with('success', 'Project deleted successfully.');
    }
}
