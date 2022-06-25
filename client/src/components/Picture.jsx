import { useState, useEffect } from "react";
import { Card, CardMedia, CardActions, Button, Box, Fade } from "@mui/material";

import WordCountSlider from "./WordCountSlider";

const Picture = ({ isLoggedIn, wordRate, setWordRate }) => {
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/300");

  // useEffect(() => {
    
  // }, []);
  return (
    <Card
      sx={{
        width: 1,
        maxWidth: 300,
        margin: "0 auto",
      }}
    >
      <Box sx={{ height: isLoggedIn ? "290px" : "286px" }}>
        {imgSrc && (
          <Fade in={true} timeout={2000} easing="ease-in-out">
            <CardMedia component="img" image={imgSrc} sx={{ height: "100%" }} />
          </Fade>
        )}
      </Box>
      <CardActions>
        <WordCountSlider wordRate={wordRate} setWordRate={setWordRate} />
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
