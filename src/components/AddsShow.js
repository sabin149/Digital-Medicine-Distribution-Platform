import {
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
} from "@material-ui/core";
import React, { useContext } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { GlobalState } from "../GlobalState";
import Skeleton from "react-loading-skeleton";

const images = [
  {
    photo:
      "https://www.epharmacy.com.np/content/images/thumbs/60a161916154b81e41abf5d8.png",
    label: "image2",
  },
  {
    photo:
      "https://www.epharmacy.com.np/content/images/thumbs/60a3806dca0b0854a8afc549.jpeg",
    label: "image1",
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginBottom: "20px",
    marginTop: "-10px",
    padding: "0 10px",
  },
  media: {
    borderRadius: "5px",
    height: "350px",
    overflow: "hidden",
    width: "100%",
    objectFit: "cover",
  },
  image: {
    height: "50px",
    marginRight: "10px",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function AddsShow() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;

  const sell = products.filter((product) => {
    return product.sold > 0;
  });

  const topSell = sell.sort(function (a, b) {
    return b - a;
  });

  const settings = {
    pauseOnHover: true,
    indicators: true,
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xl={9} lg={9} md={9} xs={12}>
          <Slide {...settings}>
            {images.map((step) => (
              <div key={step.label}>
                <img
                  src={step.photo}
                  alt={step.label}
                  className={classes.media}
                />
              </div>
            ))}
          </Slide>
        </Grid>
        <Grid
          item
          xl={3}
          lg={3}
          md={3}
          xs={12}
          component={Paper}
          style={{ marginTop: "10px" }}
        >
          <Typography
            style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}
          >
            Top Selled
          </Typography>
          <List className={classes.list}>
            {topSell.length ? (
              topSell.slice(0, 3).map((product) => (
                <ListItem
                  component={Link}
                  to={`/product_detail/${product._id}`}
                  button
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.image}
                      alt={product.title}
                      src={product.images.url}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    style={{ textTransform: "capitalize" }}
                    primary={product.title}
                    secondary={"Rs " + product.price}
                  />
                </ListItem>
              ))
            ) : (
              <ul container spacing={3} alignContent="stretch">
                {["1", "2", "3"].map((product, index) => (
                  <li
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Skeleton
                      height={110}
                      width={100}
                      style={{ marginRight: "10px" }}
                    />
                    <div>
                      <Skeleton height={30} width={160} />
                      <Skeleton height={20} width={80} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddsShow;
