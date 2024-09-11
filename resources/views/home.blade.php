@extends('layouts.admin')

@section('content')
    <div class="content-wrapper">

        <div class="card">
            <div class="card-header">
                Inventory
            </div>
            <div class="card-body">
                <div class='row align-items-center'>
                    <div class='col-md-3'></div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">



                <div class="row">
                    <div class="col-md-2">
                        <div class="d-flex align-items-center bg-white border rounded-sm overflow-hidden shadow">
                            <div
                                class="p-4 bg-success d-flex justify-content-center align-items-center rounded-sm overflow-hidden shadow">
                                <img src="{{ asset('icons/inventory.jpg') }}" alt="Goat Icon"
                                    style="height: 30px; width: 32px;">
                            </div>
                            <div class="px-4 text-gray-700">
                                <h5 class="text-sm tracking-wider"> No.of Stocks</h5>
                                <p class="text-3xl"></p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <footer class="footer">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
                <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2024.Inventory System <a href="https://sasitharan-profile.vercel.app/" target="_blank">Designed by </a> Sasitharan
                    technologies
                    All rights reserved.</span>
            </div>
        </footer>
    </div>

@endsection
