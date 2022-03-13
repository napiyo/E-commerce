import React, { useEffect, useState } from "react";
import "./products.css";
import { useAlert } from "react-alert";
import api from "../config/axiosApi";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Close, Delete, Edit, Launch } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputLabel,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import MybackDrop from "../utils/backDrop";
export default function Products() {
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const alert = useAlert();


  const [pageRefreshvariable, setpageRefreshvariable] = useState(0)
  useEffect(() => {
    api
      .get("/api/v1/products/topSellingProducts/100")
      .then((res) => {
        setproducts(res.data.products);
      })
      .catch((e) => {
        e.response
          ? alert.error(e.response.data.message)
          : alert.error("something went wrong");
      });
    api
      .get("/api/v1/products/allCategories")
      .then((res) => {
        setcategories([...res.data.categories]);
      })
      .catch((e) => {
        e.response
          ? alert.error(e.response.data.message)
          : alert.error("something went wrong");
      });
  }, [pageRefreshvariable]);

  const deleteProduct = (id) => {
    api
      .delete(`api/v1/products/updateProduct/${id}`)
      .then((res) => {
        setproducts(products.filter((item) => item._id != id));
        alert.success("product removed");
      })
      .catch((e) => {
        e.response
          ? alert.error(e.response.data.message)
          : alert.error("something went wrong");
      });
  };

  const column = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "Stock", headerName: "stock", width: 100 },
    { field: "category", headerName: "category", width: 100 },
    { field: "unitSold", headerName: "units sold", width: 100 },
    { field: "createdBy", headerName: "created By", width: 100 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem icon={<Edit />} label="edit" 
          onClick={()=>{
          
            updateEditProductDetails(params.row);
          }}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          onClick={() => deleteProduct(params.id)}
          label="delete"
        />,
      ],
    },
  ];

  // add new product dialoge

  const [openDialog, setopenDialog] = useState(false);
  const handleDialog = () => {
    if(openDialog){
      setname("");
      setauthor("");
      setdescription("");
      setprice(0);
      setcategory("")
      setStock(0);
      setnewproductImage(null);
    }
    setopenDialog(!openDialog);
  };

  // product image
  const [newproductImage, setnewproductImage] = useState(null);
  const [DialogType, setDialogType] = useState("addProduct");
  // const [newProductDetails, setnewProductDetails] = useState({});
  const [name, setname] = useState("");
  const [author, setauthor] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [category, setcategory] = useState("");
  const [Stock, setStock] = useState(0);
  // const [images, setimages] = useState([]);
  const [newproductFieldsEmptyError, setnewproductFieldsEmptyError] =
    useState(false);
  const [uploading, setuploading] = useState(false);

  const createNewProduct = async () => {
    // check for empty field

    if (
      !(
        name &&
        author &&
        description &&
        price &&
        category &&
        Stock &&
        newproductImage
      )
    ) {
      setnewproductFieldsEmptyError(true);
      setTimeout(() => {
        setnewproductFieldsEmptyError(false);
      }, 5000);
      // console.log("herer");
      return;
    }
    setuploading(true);
    // upload Image

    const formdata = new FormData();
    formdata.append("file", newproductImage);
    formdata.append("upload_preset", "bookiasProduct");
    await axios
      .post("https://api.cloudinary.com/v1_1/bookias/image/upload", formdata)
      .then((resImage) => {
        // upload data to our server
        api
          .post("api/v1/products/addProduct", {
            name,
            author,
            description,
            price,
            category,
            Stock,
            "images":[{public_id:resImage.data.public_id,public_url:resImage.data.url}]
          })
          .then((p) => {
            // setproducts([...products, p.data.createdProduct]);
            setpageRefreshvariable(pageRefreshvariable+1)
             
            handleDialog();
            alert.success("product added");
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((e) => {
        console.log(e.message);
      });
    setuploading(false);
  };


  
  // product to be updated
  const [productImgOld, setproductImgOld] = useState(null);
  const [productTobeEdited, setproductTobeEdited] = useState('')
  const updateEditProductDetails=(item)=>{
    setname(item.name);
    setauthor(item.author);
    setdescription(item.description);
    setcategory(item.category);   
    setprice(item.price);
    setStock(item.Stock);
    setnewproductImage(null);
    setproductImgOld(item.images[0].public_url)
    setDialogType("editProduct");
    handleDialog();
   setproductTobeEdited(item._id)
  }

// edit product
const editProduct=async()=>{
  setuploading(true)
  // handle Image changes
  if(!newproductImage){
    // no image change
    await api.put(`/api/v1/products/updateProduct/${productTobeEdited}`,{name,author,description,price,Stock,category}).then((res)=>{
      handleDialog()
      setpageRefreshvariable(pageRefreshvariable+1);
      alert.success("product updated");
    }).catch((e)=>{
        handleDialog()
        alert.error("product Edit failed");
    })
  }
  else{
    // upload new image
    const formdata = new FormData();
    formdata.append("file", newproductImage);
    formdata.append("upload_preset", "bookiasProduct");

    await axios.post("https://api.cloudinary.com/v1_1/bookias/image/upload", formdata)
      .then((resImage) => {
         api.put(`/api/v1/products/updateProduct/${productTobeEdited}`,{name,author,description,category,price,Stock,
          "images":[{public_id:resImage.data.public_id,public_url:resImage.data.url}]}).then((resUpdated)=>{
            handleDialog()
      setpageRefreshvariable(pageRefreshvariable+1);
      alert.success("product updated");

          }).catch((e)=>{
            handleDialog()
        alert.error("product Edit failed");
          })
      });

  }
  setname("");
  setauthor("");
  setdescription("");
  setprice(0);
  setcategory("")
  setStock(0);
  setnewproductImage(null);
   setuploading(false)
}

  return (
    <div className="userList">
      <Button onClick={()=>{
        setDialogType("addProduct")
        handleDialog();
      }}>add new product</Button>
      <DataGrid
        rows={products}
        columns={column}
        getRowId={(r) => r._id}
        autoHeight
        disableSelectionOnClick
      />

      {/* edit product  */}

      {/* new product dialog */}
      <Dialog open={openDialog} onClose={handleDialog} fullScreen>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialog}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {(DialogType==='addProduct')?"create Prodcut":"Edit Product"}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "Background" }}
              onClick={(DialogType=='editProduct')?editProduct:createNewProduct}
            >
              Submit
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="addnewProductDialogContentBOX">
          <div className="addnewProductDialogContent">
            <div className="addnewProductForm">
              <TextField
                label="Name"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="newProductItem"
              />
              <TextField
                label="Author"
                id="author"
                value={author}
                onChange={(e) => setauthor(e.target.value)}
                className="newProductItem"
              />
              <TextField
                label="description"
                id="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                multiline
                className="newProductItem"
              />
              <Alert severity="info">
                If entring new category press enter, after typing
              </Alert>
              <Autocomplete
                disablePortal
                id="categories"
                options={categories}
                freeSolo
                onChange={(e, value) => setcategory(e.target.value || value)}
                // onChange={(e)=>setnewProductDetails({...newProductDetails,category:e.target.value})}
                className="newProductItem"
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
              <InputLabel>
                {category
                  ? `category choosen is ${category}`
                  : "please select or create category"}
              </InputLabel>
              <div>
                <TextField
                  label="price"
                  id="price"
                  type={"number"}
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  sx={{ width: 150 }}
                />
                <TextField
                  label="stock"
                  id="stock"
                  type={"number"}
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                  sx={{ width: 150, marginLeft: "2vmax" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "3vmax",
              display: "flex",
              flexDirection: "column",
              rowGap: "1vmax",
              maxWidth: "400px",
              overflow: "hidden",
            }}
          >
            <div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setnewproductImage(e.target.files[0])}
              />
            </div>
            <div></div>
            {(newproductImage || DialogType=='editProduct') ? (
              <img
                src={(DialogType=='editProduct' && !newproductImage)?productImgOld:URL.createObjectURL(newproductImage) }
                alt="loading"
                width={200}
              />
            ) : (
              ""
            )}
            {newproductFieldsEmptyError ? (
              <Alert severity="error">Image and all fields are required</Alert>
            ) : (
              ""
            )}
          </div>
        </DialogContent>

        <MybackDrop open={uploading} />
      </Dialog>
    </div>
  );
}
