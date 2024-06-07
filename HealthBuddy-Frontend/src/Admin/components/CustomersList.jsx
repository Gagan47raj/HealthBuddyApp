import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../../States/User/Action";

export function CustomersList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userState);


  useEffect(() => {
    dispatch(findUser());
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 border border-gray-300 bg-white">
      <ul role="list" className="divide-y divide-gray-100">
        {users?.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.imageUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.createdAt.slice(0,10)}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              <p className="text-sm leading-6 text-gray-900">{person.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomersList;
