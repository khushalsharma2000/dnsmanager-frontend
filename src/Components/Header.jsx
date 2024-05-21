import React from "react";
import {
  Navbar,
  Typography,
  
} from "@material-tailwind/react";


function Header() {
  return (
    <Navbar
      variant="gradient"
      className="mx-auto max-w-screen-xxl bg-red-500 px-4 py-3 flex justify-center "
    >
      <Typography
      variant="h6"
      className="mr-4 ml-2 cursor-pointer py-1.5 text-2xl text-white"
      onClick={() => window.location.reload()}
    >
      DNS DASHBOARD
    </Typography>
    </Navbar>
  );
}

export default Header;
