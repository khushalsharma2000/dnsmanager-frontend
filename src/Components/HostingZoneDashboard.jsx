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
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';
import CreateDomain from "./CreateDomainpopup";
import UpdateDNSRecord from "./updateDNSpopup";
import { listDomains, createDomain, deleteDomain } from "../APIs/domainAPIs";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Name", "ResourceRecordSetCount"];

function HostingZoneDashboard() {
  const [domainEntries, setDomainEntries] = useState([]);
  const [isCreateOrUpdateDomainOpen, setIsCreateOrUpdateDomainOpen] =
    useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const data = await listDomains();
      setDomainEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDomainEntries = domainEntries.filter((record) =>
    record.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateOrUpdateDomain = async (recordData, ttl) => {
    try {
      if (recordToUpdate) {
        await updateDomain(recordToUpdate.id, recordData, ttl);
      } else {
        await createDomain(recordData);
      }
      fetchDomains();
      setIsCreateOrUpdateDomainOpen(false); // Close the popup after successful creation or update
      setRecordToUpdate(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewRecords = (hostedZoneId, domainName) => {
    const domainId = hostedZoneId.split("/").pop();
    navigate(`/records?code=${encodeURIComponent(domainId)}`, {
      state: { title: domainName },
    });
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
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex justify-between items-center"
        >
          <div>
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-2/3" />}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => setIsCreateOrUpdateDomainOpen(true)}
            >
              <UserPlusIcon strokeWidth={2} className="h-4" />
              Create Domain
            </Button>
          </div>
          <div>
            <Button className="ml-3" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </CardHeader>

        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70 text-lg"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredDomainEntries.length > 0 ? (
                filteredDomainEntries.map((record, index) => (
                  <tr key={index}>
                    <td className="p-4">{record.Name}</td>
                    <td className="p-4">{record.ResourceRecordSetCount}</td>
                    <td className="flex gap-2 p-4">
                      <Button
                        onClick={() => handleViewRecords(record.Id, record.Name)}
                        size="sm"
                        color="yellow"
                      >
                        View Records
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length + 1} className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      No domains available.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Typography
            variant="h6"
            color="blue-gray"
            className="font-medium mt-8 mb-4 text-center text-5xl text-deep-blue-500"
          >
            Graphical Representation
          </Typography>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                width={600}
                height={300}
                data={filteredDomainEntries}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ResourceRecordSetCount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={filteredDomainEntries}
                  dataKey="ResourceRecordSetCount"
                  nameKey="Name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#177666"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardBody>

        {/* Render the CreateDomain component as a popup */}
        {isCreateOrUpdateDomainOpen && (
          <CreateDomain
            onSubmit={handleCreateOrUpdateDomain}
            onClose={() => setIsCreateOrUpdateDomainOpen(false)}
          />
        )}

        {/* Render the UpdateDNSRecord component as a popup */}
        {recordToUpdate && (
          <UpdateDNSRecord
            initialDomainName={recordToUpdate.Name}
            initialRecordType={recordToUpdate.Type}
            initialRecordValue={recordToUpdate.ResourceRecords[0].Value}
            initialTTL={recordToUpdate.TTL}
            onSubmit={handleCreateOrUpdateDomain}
            onClose={() => {
              setIsCreateOrUpdateDomainOpen(false);
              setRecordToUpdate(null);
            }}
          />
        )}
      </Card>
    </>
  );
}

export default HostingZoneDashboard;
