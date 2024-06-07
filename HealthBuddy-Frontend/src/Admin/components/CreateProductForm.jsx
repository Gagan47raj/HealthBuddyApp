import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../States/Product/Action";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";


const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    name: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    size: "",
    description: "",
    quantity: "",
    category: "",
    severity: "",
    medicineType: "",
  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (productData.category) {
      dispatch(createProduct(productData));
      console.log("Product data before submit:", productData);
    } else {
      console.error("First category must be selected");
    }
  };

  return (
    <div className="p-10">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Add New Product
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Disease</InputLabel>
              <Select
                name="category"
                value={productData.category}
                onChange={handleChange}
                label="First Category"
              >
                <MenuItem value="Acne">Acne</MenuItem>
                <MenuItem value="AIDS">AIDS</MenuItem>
                <MenuItem value="Alcoholic hepatitis">
                  Alcoholic hepatitis
                </MenuItem>
                <MenuItem value="Allergy">Allergy</MenuItem>
                <MenuItem value="Arthritis">Arthritis</MenuItem>
                <MenuItem value="Bronchial Asthma">Bronchial Asthma</MenuItem>
                <MenuItem value="Cervical spondylosis">
                  Cervical spondylosis
                </MenuItem>
                <MenuItem value="Chicken pox">Chicken pox</MenuItem>
                <MenuItem value="Chronic cholestasis">
                  Chronic cholestasis
                </MenuItem>
                <MenuItem value="Common Cold">Common Cold</MenuItem>
                <MenuItem value="Dengue">Dengue</MenuItem>
                <MenuItem value="Diabetes">Diabetes</MenuItem>
                <MenuItem value="Dimorphic hemmorhoids(piles)">
                  Dimorphic hemmorhoids(piles)
                </MenuItem>
                <MenuItem value="Drug Reaction">Drug Reaction</MenuItem>
                <MenuItem value="Fungal infection">Fungal infection</MenuItem>
                <MenuItem value="Gastroenteritis">Gastroenteritis</MenuItem>
                <MenuItem value="GERD">GERD</MenuItem>
                <MenuItem value="Heart attack">Heart attack</MenuItem>
                <MenuItem value="Hepatitis A">Hepatitis A</MenuItem>
                <MenuItem value="Hepatitis B">Hepatitis B</MenuItem>
                <MenuItem value="Hepatitis C">Hepatitis C</MenuItem>
                <MenuItem value="Hepatitis D">Hepatitis D</MenuItem>
                <MenuItem value="Hepatitis E">Hepatitis E</MenuItem>
                <MenuItem value="Hyperthyroidism">Hyperthyroidism</MenuItem>  
                <MenuItem value="Hypertension">Hypertension</MenuItem>
                <MenuItem value="Hypoglycemia">Hypoglycemia</MenuItem>
                <MenuItem value="Hypothyroidism">Hypothyroidism</MenuItem>
                <MenuItem value="Impetigo">Impetigo</MenuItem>
                <MenuItem value="Jaundice">Jaundice</MenuItem>
                <MenuItem value="Malaria">Malaria</MenuItem>
                <MenuItem value="Migraine">Migraine</MenuItem>
                <MenuItem value="Osteoarthritis">Osteoarthritis</MenuItem>
                <MenuItem value="Paralysis (brain hemorrhage)">
                  Paralysis (brain hemorrhage)
                </MenuItem>
                <MenuItem value="Peptic ulcer disease">
                  Peptic ulcer disease
                </MenuItem>
                <MenuItem value="Pneumonia">Pneumonia</MenuItem>
                <MenuItem value="Psoriasis">Psoriasis</MenuItem>
                <MenuItem value="Typhoid">Typhoid</MenuItem>
                <MenuItem value="Tuberculosis">Tuberculosis</MenuItem>
                <MenuItem value="Urinary tract infection">
                  Urinary tract infection
                </MenuItem>
                <MenuItem value="Varicose veins">Varicose veins</MenuItem>
                <MenuItem value="(vertigo) Paroxysmal Positional Vertigo">
                  (vertigo) Paroxysmal Positional Vertigo
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Severity Level</InputLabel>
              <Select
                name="severity"
                value={productData.severity}
                onChange={handleChange}
                label="Second Category"
              >
                <MenuItem value="mild">Mild</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="critical">Severe</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Medicine Type</InputLabel>
              <Select
                name="medicineType"
                value={productData.medicineType}
                onChange={handleChange}
                label="Third Category"
              >
                <MenuItem value="tablet">Tablet</MenuItem>
                <MenuItem value="capsule">Capsule</MenuItem>
                <MenuItem value="injection">Injection</MenuItem>
                <MenuItem value="cream">Cream</MenuItem>
                <MenuItem value="ointment">Ointment</MenuItem>
                <MenuItem value="gel">Gel</MenuItem>
                <MenuItem value="syrup">Syrup</MenuItem>
                <MenuItem value="suspension">Suspension</MenuItem>
                <MenuItem value="powder">Powder</MenuItem>
                <MenuItem value="suppository">Suppository</MenuItem>
                <MenuItem value="drops">Drops</MenuItem>
                <MenuItem value="inhaler">Inhaler</MenuItem>
                <MenuItem value="patch">Patch</MenuItem>
                <MenuItem value="lozenge">Lozenge</MenuItem>
                <MenuItem value="spray">Spray</MenuItem>
                <MenuItem value="solution">Solution</MenuItem>
                <MenuItem value="lotion">Lotion</MenuItem>
                <MenuItem value="foam">Foam</MenuItem>
                <MenuItem value="shampoo">Shampoo</MenuItem>
                <MenuItem value="granules">Granules</MenuItem>
                <MenuItem value="emulsion">Emulsion</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              id="outlined-multiline-static"
              multiline
              rows={3}
              value={productData.description}
              onChange={handleChange}
            />
          </Grid>

            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size name"
                  name="size"
                  value={productData.size}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
