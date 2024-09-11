<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\InventoryController;

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/home', function () {
    return view('home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/inventory', [InventoryController::class, 'index'])->name('admin.inventory.index');
Route::get('/inventory/create', [InventoryController::class, 'create'])->name('admin.inventory.create');
Route::post('/inventory', [InventoryController::class, 'store'])->name('admin.inventory.store');
Route::get('/admin/inventory/{id}/edit', [InventoryController::class, 'edit'])->name('admin.inventory.edit');
// Route::put('/admin/breed/{breed}', [BreedController::class, 'update'])->name('admin.breed.update');
Route::delete('/admin/inventory/{inventory}', [InventoryController::class, 'destroy'])->name('admin.inventory.destroy');

