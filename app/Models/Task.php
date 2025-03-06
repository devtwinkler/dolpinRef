<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'image_path',
        'name',
        'description',
        'status',
        'due_date',
        'priority',
        'assigned_user_id',
        'project_id',
        'created_by',
        'updated_by',
    ];
    public function project(): BelongsTo{
        return $this->belongsTo(Project::class);
    }
    public function assignedUser():BelongsTo{
        return $this->belongsTo(User::class, 'assigned_user_id');
    }
    public function createdBy (): BelongsTo{
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy (): BelongsTo{
        return $this->belongsTo(User::class, 'updated_by');
    }
}
