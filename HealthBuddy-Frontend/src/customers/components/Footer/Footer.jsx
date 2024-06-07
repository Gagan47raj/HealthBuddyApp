import { Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10"
        container
        sx={{
          bgcolor: "black",
          color: "white",
          py: 3,
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h5">
            Company
          </Typography>
          <Typography className="pb-5" variant="h6">
            About
          </Typography>
          <Typography className="pb-5" variant="h6">
            Blog
          </Typography>
          <Typography className="pb-5" variant="h6">
            Career
          </Typography>
          <Typography className="pb-5" variant="h6">
            Contact
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h5">
            Our Services
          </Typography>
          <Typography className="pb-5" variant="h6">
            Order Medicine
          </Typography>
          <Typography className="pb-5" variant="h6">
            HealthCare Products
          </Typography>
          <Typography className="pb-5" variant="h6">
            Lab Test
          </Typography>
          <Typography className="pb-5" variant="h6">
            Find Nearest Pharmacy
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h5">
            Featured Categories
          </Typography>
          <Typography className="pb-5" variant="h6">
            Ayurvdic
          </Typography>
          <Typography className="pb-5" variant="h6">
            Diabetic Care
          </Typography>
          <Typography className="pb-5" variant="h6">
            Skin Care
          </Typography>
          <Typography className="pb-5" variant="h6">
            Supplements
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h5">
            Policy & Help
          </Typography>
          <Typography className="pb-5" variant="h6">
            Privacy Policy
          </Typography>
          <Typography className="pb-5" variant="h6">
            Browse Medicine
          </Typography>
          <Typography className="pb-5" variant="h6">
            Return Policy
          </Typography>
          <Typography className="pb-5" variant="h6">
            FAQs
          </Typography>
        </Grid>

        <Grid className="pt-20" item xs={12}>
            <Typography variant="body2" component="p" align="center">
                &copy; 2024 HealthBuddy. All rights reserved.
            </Typography>
            <Typography variant="body2" component="p" align="center">
                 Your Personal HealthCare Buddy.
            </Typography>
            <Typography variant="body2" component="p" align="center">
                 Website made by{' Gagan '}
            </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
