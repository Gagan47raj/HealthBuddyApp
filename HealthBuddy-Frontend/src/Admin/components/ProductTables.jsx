import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../States/Product/Action";

const ProductTables = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };
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
  }, [products.deletedProduct]);

  return (
    <div className="p-5 bg-[#242B2E]">
      <Card className="mt-2">
        <CardHeader title="All Products" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">MRP</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.products?.content?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      src={row.imageUrl}
                    ></Avatar>
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.category.name}</TableCell>
                  <TableCell align="right">{row.brand}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleProductDelete(row.id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductTables;
