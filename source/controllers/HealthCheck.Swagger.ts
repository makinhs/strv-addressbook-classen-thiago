export const getPing = {
    tags: ['HealthCheck'],
    description: '',
    operationId: '',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        '200': {
            description: 'Should pong.',
            content: {
                'application/json': {
                    schema: {
                        type: 'string',
                        items: {
                            message: {
                                type: 'string',
                                description: 'Pong Response'
                            }
                        }
                    }
                }
            }
        }
    }
};
