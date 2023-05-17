import development from './dev.config';
import production from'./prod.config';

let config: any  = development;

if (process.env.NODE_ENV === 'production') {
    config = production;
}

export default config;