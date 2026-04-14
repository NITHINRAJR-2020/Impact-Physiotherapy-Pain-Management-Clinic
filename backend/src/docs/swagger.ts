import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Impact Physiotherapy API',
      version: '1.0.0',
      description:
        'REST API for Impact Physiotherapy & Pain Management Clinic — appointment booking and management.',
      contact: {
        name: 'Impact Physiotherapy',
        email: 'hello@impactphysio.in',
      },
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Development server' },
    ],
    components: {
      securitySchemes: {
        adminKey: {
          type: 'apiKey',
          in: 'header',
          name: 'x-admin-key',
          description: 'Admin API key for protected endpoints',
        },
      },
      schemas: {
        CreateAppointmentDto: {
          type: 'object',
          required: ['name', 'phone', 'date'],
          properties: {
            name: {
              type: 'string',
              example: 'Ramesh Kumar',
              description: 'Full name of the patient',
            },
            phone: {
              type: 'string',
              example: '+91 98765 43210',
              description: 'Indian mobile number',
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2024-12-25',
              description: 'Preferred appointment date (YYYY-MM-DD)',
            },
            message: {
              type: 'string',
              example: 'I have lower back pain for the past 3 months.',
              description: 'Optional message / condition description',
            },
          },
        },
        AppointmentResponse: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Ramesh Kumar' },
            phone: { type: 'string', example: '+91 98765 43210' },
            date: { type: 'string', example: '2024-12-25' },
            message: { type: 'string', nullable: true },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'cancelled'],
              example: 'pending',
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
