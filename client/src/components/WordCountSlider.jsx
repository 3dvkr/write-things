import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";

import SettingsIcon from "@mui/icons-material/Settings";

function valuetext(value) {
  return `${value} words`;
}

export default function WordCountSlider({ wordRate, setWordRate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "word-count-slider" : undefined;

  return (
    <div>
      <Tooltip title="Set Image Refresh Rate">
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          <SettingsIcon />
        </Button>
      </Tooltip>
      <Popover
        PaperProps={{ sx: { overflow: "visible" } }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "25ch", marginInline: "2ch" }}>
          <Tooltip title="Set Image Refresh Rate">
          <Slider
            aria-label="Word Rate"
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            valueLabelDisplay="on"
            step={null}
            marks={[
              { value: 10 },
              { value: 25 },
              { value: 50 },
              { value: 100 },
            ]}
            min={10}
            value={wordRate}
            onChange={(e) => setWordRate(e.target.value)}
          />
          </Tooltip>
        </Box>
      </Popover>
    </div>
  );
}
