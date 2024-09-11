@extends('layouts.admin')

@section('content')
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12">
                <div class="card">

                    <div class="card-header">
                        <h4>
                            Add Inventory
                            <a href="{{ route('admin.inventory.index') }}" class="btn btn-success btn-sm text-white float-end">Back</a>
                            <a href="{{ url()->current() }}" class="btn btn-info btn-sm text-white float-end mx-2">
                                Refresh
                            </a>
                        </h4>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.inventory.store') }}" method="POST">
                            @csrf
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="">Name</label>
                                    <input type="text" name="name" class="form-control" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="description">Description</label>
                                    <textarea name="description" class="form-control" rows="4"></textarea>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="">Quantity</label>
                                    <input type="number" name="quantity" class="form-control" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="price">Price</label>
                                    <input type="number" name="price" class="form-control" step="0.01" min="0" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="">Status</label>
                                    <select name="status" class="form-select" aria-label="Default select example">
                                        <option value="active">Active</option>
                                        <option value="inactive">InActive</option>
                                    </select>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <button type="submit" class="btn btn-success float-end">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
