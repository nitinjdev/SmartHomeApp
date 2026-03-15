module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-redux|@reduxjs|immer|@react-navigation|@react-native-firebase|react-native-safe-area-context)/)"
  ],
};
