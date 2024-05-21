import axios from "axios";

const DNSAPIs = axios.create({
  // baseURL: "http://localhost:8080/api/dns",
   baseURL: "https://dnsmanager-backend-olzn.onrender.com/api/dns"
});

export async function listHostedZones(hostedZoneId) {
  try {
    const response = await DNSAPIs.get(`/hostedZones/${hostedZoneId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createDNSRecord(dnsRecordData, code) {
  try {
    const response = await DNSAPIs.post("/dns/create", { dnsRecordData, code });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateDNSRecord(dnsRecordData, ttl, code) {
  try {
    if (ttl) {
      dnsRecordData.TTL = ttl;
    }
    const response = await DNSAPIs.put(`/dns/update`, { dnsRecordData, code });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteDNSRecord( dnsRecordData,code) {
  try {
    console.log(dnsRecordData);
    const response = await DNSAPIs.delete(`/dns/delete?code=${code}`, { data: dnsRecordData });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
