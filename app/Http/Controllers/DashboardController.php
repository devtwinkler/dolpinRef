<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $user = auth()->user();
        $pendingTasksCount = Task::query()->where('status', 'pending')->count();
        $userPendingTasksCount = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id',$user->id)
            ->count();
        $inProgressTasksCount = Task::query()->where('status', 'in_progress')->count();
        $userInProgressTasksCount = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id',$user->id)
            ->count();
        $completedTasksCount = Task::query()->where('status', 'completed')->count();
        $userCompletedTasksCount = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id',$user->id)
            ->count();
        $notifications = auth()->user()->notifications;
        return inertia('Dashboard', compact('pendingTasksCount','notifications', 'userPendingTasksCount','inProgressTasksCount','userInProgressTasksCount','completedTasksCount','userCompletedTasksCount'));
    }
}
