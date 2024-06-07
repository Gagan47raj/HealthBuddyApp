import { Button } from '@mui/material';
import React from 'react';

const AddressCard = ({ address, onSelectAddress, showButton = true }) => {
  const renderAddress = (addr) => (
    <div key={addr.id} className="space-y-3">
      <p className="font-semibold">
        {addr.firstName} {addr.lastName}
      </p>
      <p>
        {addr.streetAddress}, {addr.city}, {addr.state}, {addr.zipCode}
      </p>
      <div className="space-y-1">
        <p className="font-semibold">Phone Number</p>
        <p>{addr.mobile}</p>
      </div>
      {showButton && (
        <Button
          sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
          size="large"
          variant="contained"
          onClick={() => onSelectAddress(addr)}
        >
          Delivery Here
        </Button>
      )}
      <hr />
      <br />
    </div>
  );

  if (Array.isArray(address)) {
    return address.length > 0 ? (
      address.map(renderAddress)
    ) : (
      <p>No address available</p>
    );
  }

  return address ? renderAddress(address) : <p>No address available</p>;
};

export default AddressCard;
