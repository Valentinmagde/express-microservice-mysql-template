import development from './dev.config';
import production from'./prod.config';

var config: any = development;

if (process.env.NODE_ENV === 'production') {
    config = production;
}

export default config;