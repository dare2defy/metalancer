import { AlchemyProvider, InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';

const provider = new JsonRpcProvider("https://ethereum.rpc.evmos.dev");
 
//new InfuraProvider(config.network, config.infuraKey);

export default provider;

const debugProvider = new JsonRpcProvider("https://ethereum.rpc.evmos.dev");

export { debugProvider };
