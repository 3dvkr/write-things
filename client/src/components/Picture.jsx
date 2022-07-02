import { useState, useEffect } from "react";
import { Card, CardMedia, CardActions, Button, Box, Fade } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WordCountSlider from "./WordCountSlider";

const Picture = ({ isLoggedIn, wordRate, setWordRate }) => {
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/300");
  
  return (
    <Card
      sx={{
        flexShrink: 0,
        flexBasis: "40%",
      }}
    >
      {/* <Box sx={{ height: isLoggedIn ? "290px" : "286px" }}> */}
      <Box sx={{ height: "286px" }}>
        {imgSrc && (
          <Fade in={true} timeout={2000} easing="ease-in-out">
            <CardMedia
              component="img"
              image={imgSrc}
              sx ={{
                maxHeight: "100%",
                width: "100%"
              }}
            />
          </Fade>
        )}
      </Box>
      <CardActions sx={{ justifyContent: "space-around", marginTop: "1.2rem" }}>
        <WordCountSlider wordRate={wordRate} setWordRate={setWordRate} />
        <Button
          variant="contained"
          onClick={async () => {
            setImgSrc("");
            const { url } = await fetch("https://picsum.photos/300");
            setImgSrc(url);
          }}
        >
          <AutorenewIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Picture;
