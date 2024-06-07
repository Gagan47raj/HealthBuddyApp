import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../States/Auth/Action";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error, jwt } = useSelector((state) => state.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="px-10 sm:px-6 lg:px-8">
      <div className="px-10 sm:px-6 lg:px-8">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-10 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.firstName} {user.lastName}
            </dd>
            {/* </div>
                    <div className="px-10 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Application for
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.applicationFor}
                        </dd> */}
          </div>
          <div className="px-10 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>
          <div className="px-10 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.phone}
            </dd>
          </div>
          {/* <div className="px-10 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Account Creat
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.about}
                        </dd>
                    </div> */}

          <div className="px-10 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                {user.address.length > 0 ? (
                  user.address.map((addr, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                    >
                      <div className="flex-col w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {addr.firstName} {addr.lastName}
                          </span>
                        </div>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {addr.streetAddress}
                          </span>
                        </div>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {addr.city}, {addr.state}, {addr.zipCode}
                          </span>
                        </div>
                        
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            Phone : {addr.mobile}
                          </span>
                        </div>
                      </div>
                      

                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Update
                        </a>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-red-600 hover:text-indigo-500"
                        >
                          Delete
                        </a>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          No address available
                        </span>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
