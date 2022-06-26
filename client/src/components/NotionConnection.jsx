import { Box, Button, Link } from "@mui/material";

const oauth_client_id = "6cf136cc-35be-433c-935f-5ffdf2b3b5d1";

const NotionConnection = ({isLoggedIn, setIsLoggedIn}) => {
    const logOut = () => {
        fetch("/api/logout", {
          method: "DELETE",
          credentials: "include",
        });
        setIsLoggedIn(false);
      };
    
    return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <Link
          variant="button"
          color="inherit"
          href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
        >
          {isLoggedIn && "Re-"}Connect To Notion
        </Link>
        {isLoggedIn && <Button onClick={logOut} color="inherit" variant="text">Disconnect from Notion</Button>}
      </Box>
    )
}

export default NotionConnection;