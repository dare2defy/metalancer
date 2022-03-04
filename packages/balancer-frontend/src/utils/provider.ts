import { AlchemyProvider, InfuraProvider, JsonRpcProvider } from "@ethersproject/providers";

import config from "@/config";

const provider = new JsonRpcProvider("https://evmos-archive-testnet.api.bdnodes.net:8545");

//new InfuraProvider(config.network, config.infuraKey);

export default provider;

const debugProvider = new JsonRpcProvider("https://evmos-archive-testnet.api.bdnodes.net:8545");

export { debugProvider };
