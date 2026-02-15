import React  from 'react';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { HiOutlineUser, HiUserGroup } from 'react-icons/hi';
import { MdLibraryAdd, MdLibraryBooks, MdMenuBook, MdShoppingCart } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {


  const { role } = useRole();
  // console.log('your role is ', role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <Logo></Logo>
          </div>
        </nav>
        {/* Page content here */}
        {/* <div className="p-4">Page Content</div> */}
        <div>
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {role === "user" && (
              <>
                {/* My Orders */}
                <li>
                  <NavLink
                    to={"/dashboard/my-orders"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="My Orders"
                  >
                    <MdShoppingCart></MdShoppingCart>
                    <span className="is-drawer-close:hidden">My Orders</span>
                  </NavLink>
                </li>

                {/* my profile */}
                <li>
                  <NavLink
                    to={"/dashboard/my-profile"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="My Profile"
                  >
                    <HiOutlineUser></HiOutlineUser>
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>

                {/* invoices here */}
                <li>
                  <NavLink
                    to={"/dashboard/invoice"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="Invoice"
                  >
                    <FaFileInvoiceDollar></FaFileInvoiceDollar>
                    <span className="is-drawer-close:hidden">Invoice</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "librarian" && (
              <>
                {/* Add books */}
                <li>
                  <NavLink
                    to={"/dashboard/add-book"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="Add Book"
                  >
                    <MdLibraryAdd></MdLibraryAdd>
                    <span className="is-drawer-close:hidden">Add Book</span>
                  </NavLink>
                </li>

                {/* My Books  */}
                <li>
                  <NavLink
                    to={"/dashboard/my-books"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="My Books"
                  >
                    <MdMenuBook></MdMenuBook>
                    <span className="is-drawer-close:hidden">My Books</span>
                  </NavLink>
                </li>

                {/* orders  */}
                <li>
                  <NavLink
                    to={"/dashboard/orders"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="Orders"
                  >
                    <MdShoppingCart></MdShoppingCart>
                    <span className="is-drawer-close:hidden">Orders</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                {/* All Users  */}
                <li>
                  <NavLink
                    to={"/dashboard/all-users"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="All Users"
                  >
                    <HiUserGroup></HiUserGroup>
                    <span className="is-drawer-close:hidden">All Users</span>
                  </NavLink>
                </li>

                {/*  Manage Books  */}
                <li>
                  <NavLink
                    to={"/dashboard/manage-books"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="Manage Books"
                  >
                    <MdLibraryBooks></MdLibraryBooks>
                    <span className="is-drawer-close:hidden">Manage Books</span>
                  </NavLink>
                </li>

                {/* my profile */}
                <li>
                  <NavLink
                    to={"/dashboard/my-profile"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                    data-tip="My Profile"
                  >
                    <HiOutlineUser></HiOutlineUser>
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;