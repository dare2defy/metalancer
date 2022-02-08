class Client {
  get(ipfsHash, protocolType = 'ipfs') {
    //const url = `https://${process.env.VUE_APP_IPFS_NODE}/${protocolType}/${ipfsHash}`;
    const url = "http://localhost:8081/_totals.json";
    return fetch(url).then(res => res.json());
  }
}

const client = new Client();

export default client;
