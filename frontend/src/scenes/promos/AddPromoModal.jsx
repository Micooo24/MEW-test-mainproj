import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from '../../components/Loader.jsx'; // Adjust the path if necessary

const AddPromoModal = ({ open, handleClose, onPromoAdded }) => {
  const [promo, setPromo] = useState({
    name: "",
    description: "",
    discount: "",
    startDate: "",
    endDate: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromo((prevPromo) => ({
      ...prevPromo,
      [name]: value,
    }));
  };

  const imageHandler = (e) => {
    setImageFiles([...e.target.files]); // Store selected image files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state immediately upon submission
    const formData = new FormData();
    formData.append("name", promo.name);
    formData.append("description", promo.description);
    formData.append("discount", promo.discount);
    formData.append("startDate", promo.startDate);
    formData.append("endDate", promo.endDate);

    // Append image files to FormData
    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const response = await axios.post("http://localhost:4000/api/promos", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Ensure the response contains the newly added promo
      const newPromo = response.data.promo;

      onPromoAdded(newPromo); // Callback to update the parent component
      toast.success(response.data.message, { position: "top-right" }); // Success notification
      handleClose(); // Close the modal after adding

      // Reset the form fields after submission
      setPromo({
        name: "",
        description: "",
        discount: "",
        startDate: "",
        endDate: "",
      });
      setImageFiles([]); // Clear the image files
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage, { position: "top-right" }); // Error notification
      console.error("Error adding promo:", errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          margin: "auto",
          borderRadius: 2,
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Add New Promo
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Promo Name"
            name="name"
            value={promo.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={promo.description}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Discount (%)"
            name="discount"
            type="number"
            value={promo.discount}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Start Date"
            name="startDate"
            type="date"
            value={promo.startDate}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="End Date"
            name="endDate"
            type="date"
            value={promo.endDate}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={imageHandler}
            required
            style={{ marginTop: 8 }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
            {/* Loader to the left of the Add Promo button */}
            {loading && (
              <Loader 
                style={{ width: '24px', height: '24px', marginRight: '8px' }} // Set size and margin for spacing
              />
            )}
            <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mr: 1 }}>
              {loading ? "Adding..." : "Add Promo"}
            </Button>
            
            <Button 
              variant="contained"
              onClick={handleClose}
              sx={{ backgroundColor: '#4ccdac', color: 'white', '&:hover': { backgroundColor: '#3cb8a9' }, ml: 1 }}
            >
              Back
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPromoModal;
