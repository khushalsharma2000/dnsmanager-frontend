import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const CreateDomain = ({ onSubmit, onClose }) => {
  const [domainName, setDomainName] = useState("");
  const [recordType, setRecordType] = useState("");
  const [recordValue, setRecordValue] = useState("");
  const [description, setDescription] = useState("");

  const handleRecordTypeChange = (event) => {
    const selectedType = event.target.value;
    setRecordType(selectedType);
    switch (selectedType) {
      case "A":
        setRecordValue("192.0.2.1");
        break;
      case "AAAA":
        setRecordValue("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
        break;
      case "CNAME":
        setRecordValue("example.com");
        break;
      case "MX":
        setRecordValue("10 mail.example.com");
        break;
      case "NS":
        setRecordValue("ns1.example.com");
        break;
      case "PTR":
        setRecordValue("example.com");
        break;
      case "SOA":
        setRecordValue(
          "ns1.example.com hostmaster.example.com 2022032801 7200 3600 1209600 3600"
        );
        break;
      case "SRV":
        setRecordValue("0 5 5269 xmpp-server.example.com");
        break;
      case "TXT":
        setRecordValue("sample text");
        break;
      case "DNSSEC":
        setRecordValue("true");
        break;
      default:
        setRecordValue("");
    }
  };

  const handleSubmit = () => {
    const newDomain = {
    domainName,
    description
    };
    onSubmit(newDomain);
  };

  return (
    <Popover
      open={true} 
      onClose={onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 4 }}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Create HostedZone
        </Typography>
        <Typography variant="body1" gutterBottom>
          Domain Name
        </Typography>
        <TextField
          fullWidth
          id="domain-name"
          className="mb-2"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
        />
        
        <Typography variant="body1" gutterBottom>
          Description
        </Typography>
        <TextField
          fullWidth
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <Button variant="contained" onClick={handleSubmit}>
          Create HostedZone
        </Button>
      </Box>
    </Popover>
  );
};

export default CreateDomain;
