import { useState, useEffect } from "react";
import { Card, CardMedia, CardActions, Button, Box, Fade } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WordCountSlider from "./WordCountSlider";

const Picture = ({ isLoggedIn, wordRate, setWordRate }) => {
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/300");
  
  return (
    <Card
      sx={{
        flexGrow: 5,
      }}
    >
      <Box sx={{ height: isLoggedIn ? "290px" : "286px" }}>
      {/* <Box> */}
        {imgSrc && (
          <Fade in={true} timeout={2000} easing="ease-in-out">
            <CardMedia
              component="img"
              image={imgSrc}
              sx ={{
                maxHeight: "100%"
              }}
            />
          </Fade>
        )}
      </Box>
      <CardActions sx={{ justifyContent: "space-around" }}>
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
