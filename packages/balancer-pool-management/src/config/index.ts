import merge from 'lodash/merge';
import registry from 'balancer-assets/generated/pm/registry.homestead.json';
import registryKovan from 'balancer-assets/generated/pm/registry.kovan.json';
import homestead from '@/config/homestead.json';
import kovan from '@/config/kovan.json';
import rinkeby from '@/config/rinkeby.json';
import evmosTestnet from '@/config/evmosTestnet.json';

const registryRinkeby = {
  tokens: {
    '0xc778417E063141139Fce010982780140Aa0cD5Ab': {
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      id: 'weth',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      precision: 4,
      color: '#828384',
      hasIcon: false,
      logoUrl:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    }
  },
  untrusted: []
};
const registryEvmosTestnet = {
  tokens: {
    '0x3fef4c7FDbC405C3A507E074779C50189a1e2C22': {
      address: '0x3fef4c7FDbC405C3A507E074779C50189a1e2C22',
      id: 'tok1',
      name: 'TOK1',
      symbol: 'TOK1',
      decimals: 18,
      precision: 4,
      color: '#828384',
      hasIcon: false,
      logoUrl:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    },
    '0x802f53aFD50ebB03d17CAE8104779965FDe00034': {
      address: '0x802f53aFD50ebB03d17CAE8104779965FDe00034',
      id: 'tok2',
      name: 'TOK2',
      symbol: 'TOK2',
      decimals: 18,
      precision: 4,
      color: '#828384',
      hasIcon: false,
      logoUrl:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    },
    '0x37cD3F04955fF3AC1b83fC565e58Fd42c2B7B5ED': {
      address: '0x37cD3F04955fF3AC1b83fC565e58Fd42c2B7B5ED',
      id: 'tok3',
      name: 'TOK3',
      symbol: 'TOK3',
      decimals: 18,
      precision: 4,
      color: '#828384',
      hasIcon: false,
      logoUrl:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    }
  },
  untrusted: []
};

const configs = { homestead, kovan, rinkeby, evmosTestnet };
configs.homestead = merge(registry, configs.homestead);
configs.kovan = merge(registryKovan, configs.kovan);
configs.rinkeby = merge(registryRinkeby, configs.rinkeby);
configs.evmosTestnet = merge(registryEvmosTestnet, configs.evmosTestnet);
const network = process.env.VUE_APP_NETWORK || 'evmosTestnet';
const config = configs[network];
config.env = process.env.VUE_APP_ENV || 'staging';
console.log('index config: ' + config.network + ' ' + config.chainId);

export default config;
