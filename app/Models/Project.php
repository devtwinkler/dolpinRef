<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'image_path',
        'name',
        'description',
        'status',
        'due_date',
        'created_by',
        'updated_by',
        ];
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
    public function createdBy(): BelongsTo{
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(): BelongsTo{
        return $this->belongsTo(User::class, 'updated_by');
    }
}
