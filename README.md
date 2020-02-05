# PropertyHunter

#### See what's up for sale in Victoria on Domain, simply search for a suburb to see nearby properties!

To run the app:

```sh
yarn
react-native run-ios
react-native run-android
```

Run tests:

```sh
yarn test
```

## Notes

- It sometimes makes sense to test React hooks and contexts separately, however most of their behaviour in this app has been tested implicily with existing tests!
- The app requires some testing of the navigation stack itself -- this was non-trivial to achieve quickly with the alpha release of react-navigation alpha I decided to play with.
- Following from above, `App.js` still requires some basic testing.
- End-to-end testing could solve the above using Detox or Appium and more time.
