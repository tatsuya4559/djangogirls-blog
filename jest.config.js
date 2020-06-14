module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
  },
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
};
