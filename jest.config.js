module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
  },
};
