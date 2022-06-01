import { useState } from "react";
import {
  Card,
  CardMedia,
  CardActions,
  Button,
  Box,
  Fade,
} from "@mui/material";

const Picture = () => {
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/300");
  return (
    <Card
      sx={{
        width: 1,
        maxWidth: 300,
        margin: "0 auto",
      }}
    >
      <Box sx={{ height: "300px" }}>
        {imgSrc && (
          <Fade in={true} timeout={2000} easing="ease-in-out">
            <CardMedia component="img" image={imgSrc} />
          </Fade>
        )}
      </Box>
      <CardActions>
        <Button
          variant="outlined"
          sx={{
            width: "50%",
            marginInline: "auto",
          }}
          onClick={async () => {
            setImgSrc("");
            const { url } = await fetch("https://picsum.photos/300");
            setImgSrc(url);
          }}
        >
          New Picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default Picture;
