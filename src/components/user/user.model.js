import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });

ajvErrors(ajv);

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    login: { type: 'string' },
    password: {
      type: 'string',
      pattern: '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$',
    },
    age: { type: 'number', minimum: 4, maximum: 130 },
    isDeleted: { type: 'boolean' },
  },
  required: ['login', 'password', 'age'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      password: 'Password must contain letters and numbers',
      age: 'Age must be between 4 and 130',
    },
  },
};

const validate = ajv.compile(userSchema);

const validateUser = (data) => {
  const isValid = validate(data);

  const errors = validate?.errors?.map((error) => error.message) || [];

  return { isValid, errors };
};

export { validateUser };
