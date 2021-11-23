import { AlchemyProvider, InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';

const provider = new JsonRpcProvider("http://dare2defy.xyz:8545");
 
//new InfuraProvider(config.network, config.infuraKey);



export default provider;

const debugProvider = new AlchemyProvider(config.network, config.alchemyKey);

export { debugProvider };
