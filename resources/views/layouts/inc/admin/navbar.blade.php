
<style>
    .notification-area {
        width: 350px;
    }

    .notification-area {
        .alert {

            margin-left: 10px;
            margin-right: 10px;
            width: 330px;
        }
</style>
<nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style="background-color: #00ff00;">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <!-- Main logo and text -->
        <a class="navbar-brand brand-logo mr-5" href="{{ url('/home') }}">
            <img src="{{ asset('assets/images/logo2.png') }}" class="mr-2" alt="logo" />

        </a>

        <!-- Mini logo and text for smaller screens -->
        <a class="navbar-brand brand-logo-mini" href="{{ url('/home') }}">
            <img src="{{ asset('assets/images/logo2.png') }}" alt="logo" />
      
        </a>
    </div>



</style>


    <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span class="icon-menu"></span>
        </button>

        <ul class="navbar-nav navbar-nav-right">

            <li class="nav-item">
                <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <i class="ti-power-off text-primary"></i>
                    {{ __('Logout') }}
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form>
            </li>

            <li class="nav-item nav-profile dropdown">
                <a class="nav-link dropdown-toggle" href="" data-toggle="dropdown" id="profileDropdown">
                    <span class="menu-title">{{ Auth::user()->name }}</span>
                </a>
            </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
            data-toggle="offcanvas">
            <span class="icon-menu"></span>
        </button>
    </div>
</nav>
