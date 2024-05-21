import axios from "axios";

const DOMAINAPIs = axios.create({
  // baseURL: "http://localhost:8080/api/domain",
   baseURL : `https://dnsmanager-backend-olzn.onrender.com/api/domain`
});

export async function listDomains() {
  try {
    const response = await DOMAINAPIs.get("/domains");
    // console.log('resp - ',response.data.hostedZones);
    return response.data.hostedZones;
  } catch (error) {
    console.error('error in receiving msgs - ',error.message);
  }
}

export async function createDomain(domainData) {
  try {
    console.log('in call - ',domainData)
    const response = await DOMAINAPIs.post("/createdomain", domainData);
    console.log("create success - ",response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}


export async function deleteDomain(hostedZoneId) {
  try {
    console.log('zoneid -',hostedZoneId)
    const response = await DOMAINAPIs.delete(`/deletedomain/${hostedZoneId}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
   
  }
}
