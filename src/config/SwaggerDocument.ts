import { getPing } from '../controllers/HealthCheck.Swagger';

export const SwaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'Project Description',
        termsOfService: '',
        contact: {
            name: 'Thiago Classen',
            email: '',
            url: ''
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    paths: {
        '/ping': {
            get: getPing
        }
    }
};
