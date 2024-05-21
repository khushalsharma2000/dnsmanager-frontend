import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import {
  listHostedZones,
  createDNSRecord,
  updateDNSRecord,
  deleteDNSRecord,
} from "../APIs/dnsAPIs"; // Import API functions
import { UserPlusIcon } from "@heroicons/react/24/solid";
import CreateDNSRecord from "./createDNSpopup";
import UpdateDNSRecord from "./updateDNSpopup";
import { ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const TABLE_HEAD = ["Domain Name", "Type", "Value", ""];

function Dashboard() {
  const [dnsRecords, setDNSRecords] = useState([]);
  const [isCreateOrUpdateDNSRecordOpen, setIsCreateOrUpdateDNSRecordOpen] =
    useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log(code);
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || {};

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDNSRecords = dnsRecords.filter((record) =>
    record.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchDNSRecords();
  }, []);

  const fetchDNSRecords = async () => {
    try {
      console.log("code in fetch", code);
      const data = await listHostedZones(code);
      setDNSRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdateDNSRecord = async (recordData, ttl) => {
    try {
      if (recordToUpdate) {
        
        await updateDNSRecord(recordData, ttl, code);
        
      } else {
        await createDNSRecord(recordData, code);
        window.location.reload();
      }
      fetchDNSRecords();
      setIsCreateOrUpdateDNSRecordOpen(false);
      setRecordToUpdate(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDNSRecord = (record) => {
    
    setRecordToUpdate(record);
    setIsCreateOrUpdateDNSRecordOpen(true);
    console.log("hello");
  
  };

  const handleDeleteDNSRecord = async (record) => {
    try {
      console.log("code in delete - ", code);
      console.log(record);
      await deleteDNSRecord(record, code);
      fetchDNSRecords();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    // Implement your sign-out logic here
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <>
      <Card className="h-full w-full bg-orange-300">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between mb-4 ">
            <div className="w-1/3">
              <div className="flex flex-row justify-center p-4 mr-4">
                <Button
                  className="flex items-center gap-3 mr-4"
                  size="sm"
                  onClick={() => setIsCreateOrUpdateDNSRecordOpen(true)}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 " />
                  Create Record
                </Button>
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  onClick={() => navigate("/home")}
                >
                  Back to Zones
                </Button>
              </div>
            </div>
            <div className="w-2/3">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-2/3" />}
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="flex items-center justify-center text-4xl text-slate-500 p-4">
            <h1>
              <b>{title}</b>
            </h1>
          </div>
          {/* Sign-out button */}
          <Button
            className="absolute top-4 right-4 mt-10"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </CardHeader>

        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-500 p-4"
                  >
                    <Typography
                      variant="small"
                      color="black-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
                <th className="border-y border-blue-gray-100 bg-blue-500 p-4"></th>{" "}
              </tr>
            </thead>
            <tbody>
              {filteredDNSRecords.length > 0 ? (
                filteredDNSRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="p-4 ">{record.Name}</td>
                    <td className="p-4 ">{record.Type}</td>
                    <td className="p-4 ">{record.ResourceRecords[0].Value}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleUpdateDNSRecord(record)}
                          size="sm"
                          className="bg-blue-500"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => handleDeleteDNSRecord(record)}
                          size="sm"
                          color="yellow"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length + 1} className="p-4">
                    <Typography
                      variant="small"
                      color="black-gray"
                      className="font-normal"
                    >
                      No DNS records available.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>

        {/* Render the CreateDNSRecord component as a popup */}
        {isCreateOrUpdateDNSRecordOpen && (
          <CreateDNSRecord
            onSubmit={handleCreateOrUpdateDNSRecord}
            onClose={() => setIsCreateOrUpdateDNSRecordOpen(false)}
          />
        )}

        {/* Render the UpdateDNSRecord component as a popup */}
        {recordToUpdate && (
          <UpdateDNSRecord
            initialDomainName={recordToUpdate.Name}
            initialRecordType={recordToUpdate.Type}
            initialRecordValue={recordToUpdate.ResourceRecords[0].Value}
            initialTTL={recordToUpdate.TTL}
            onSubmit={handleCreateOrUpdateDNSRecord}
            onClose={() => {
              setIsCreateOrUpdateDNSRecordOpen(false);
              setRecordToUpdate(null);
            }}
          />
        )}
      </Card>
      <ToastContainer />
    </>
  );
}

export default Dashboard;
