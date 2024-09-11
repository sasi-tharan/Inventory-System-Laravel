<?php

namespace App\Http\Controllers\Admin;

use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InventoryController extends Controller
{

    public function index()
    {
        $products = Inventory::all();
        return view('admin.inventory.index', compact('products'));
    }

    public function create()
    {
        return view('admin.inventory.create');
    }

    public function store(Request $request)
    {
        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'description' => 'required',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'status' => 'required|in:active,inactive',
        ]);

        // Create a new Inventory instance
        $product = new Inventory();
        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->quantity = $validatedData['quantity'];
        $product->price = $validatedData['price'];
        $product->status = $validatedData['status'];

        // Save the product to the database
        $product->save();

        // Set the flash message to the session
        session()->flash('success', 'Inventory created successfully');

        // Redirect back to the inventory index
        return redirect()->route('admin.inventory.index');
    }

    public function edit($id)
    {
        
    }





}
