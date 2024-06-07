import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../States/Product/Action";
import { useEffect } from "react";

  
  export function ProductList() {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store);

    useEffect(() => {
        const data = {
          category: "",
          minPrice: 0,
          maxPrice: 100000000,
          minDiscount: 0,
          sortBy: "price_low",
          pageNumber: 0,
          pageSize: 10,
          stock: "",
          medicineType: "",
          severity: "",
        };
    
        dispatch(findProducts(data));
      }, []);

    return (
      <div className="px-4 sm:px-6 lg:px-8 border border-gray-300 bg-white">
        <ul role="list" className="divide-y divide-gray-400">
          {products?.products?.content?.map((person) => (
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
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.medicineType.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.category.name}</p>
                <p className="mt-1 text leading-5 text-green-900">₹{person.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ProductList;
  