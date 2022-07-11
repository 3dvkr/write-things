import { Box, Typography } from "@mui/material";
const Info = ({ wordRate }) => {
  return (
    <Box
      sx={{
        margin: "1rem 2rem",
      }}
    >
      <Typography variant="h6" gutterBottom={true} paragraph={true}>
        Write a grocery list, or a poem, or the next bestseller! You'll get a
        new photograph every {wordRate} words. Happy writing!
      </Typography>
      <Typography variant="body1" paragraph={true}>
        Use the settings under the photograph to change how often the photograph
        changes.
      </Typography>
    </Box>
  );
};

export default Info;
