<!-- Sidebar Navigation -->
<nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="custom-nav">
        <!-- Dashboard -->
        <li class="nav-item">
            <a class="nav-link" href="{{ url('/home') }}">
                <i class="icon-grid menu-icon"></i>
                <span class="menu-title">Dashboard</span>
            </a>
        </li>

        <!-- In-House Stock -->
        <li class="nav-item">
            <a class="nav-link" href="{{ route('admin.inventory.index') }}">
                <i class="bi bi-1-circle menu-icon"></i>
                <span class="menu-title">Inventory</span>
            </a>
        </li>



    </ul>
</nav>

<!-- Toggle Sidebar JavaScript -->
<script>
    $(document).ready(function() {
        $('[data-toggle="minimize"]').on('click', function() {
            $('#sidebar').toggleClass('minimized');
        });
    });
</script>

<style>
    /* Sidebar Navigation Styles */
    .custom-nav {
        list-style-type: none;
        /* Remove bullet points */
        padding-left: 0;
        /* Remove default padding */
    }

    .custom-nav .nav-item {
        margin-bottom: 10px;
        /* Adjust spacing between each menu item */
    }

    .custom-nav .nav-link {
        display: block;
        padding: 10px 20px;
        /* Adjust padding as needed */
        color: #343a40;
        /* Default text color */
        font-size: 16px;
        /* Font size */
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .custom-nav .nav-link:hover,
    .custom-nav .nav-link:focus {
        background-color: #f8f9fa;
        /* Hover background color */
        color: #20c997;
        /* Hover text color */
    }

    .custom-nav .menu-icon {
        margin-right: 10px;
        /* Adjust spacing between icon and text */
        font-size: 18px;
        /* Icon size */
    }

    .custom-nav .menu-title {
        font-weight: 500;
        /* Menu title font weight */
    }

    .custom-nav .active .nav-link {
        background-color: #e9ecef;
        /* Active link background color */
        color: #eff2f5;
        /* Active link text color */
    }

    .custom-nav .sub-menu {
        padding-left: 20px;
        /* Adjust indentation for sub-menu items */
        list-style-type: none;
        /* Remove bullets from sub-menu items */
    }

    .custom-nav .sub-menu .nav-link {
        padding: 8px 20px;
        /* Adjust padding for sub-menu items */
        font-size: 14px;
        /* Sub-menu item font size */
    }

    .custom-nav .sub-menu .menu-icon {
        font-size: 16px;
        /* Sub-menu item icon size */
    }

    /* Sidebar minimized state */
    #sidebar.minimized .menu-title {
        display: none;
        /* Hide menu titles */
    }
</style>
