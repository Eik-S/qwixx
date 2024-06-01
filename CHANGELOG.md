# Changelog

## 1.0.0 (2024-06-01)


### Features

* add back to lobby button to control pane ([2afff40](https://github.com/Eik-S/qwixx/commit/2afff40c1c06092a09ab26efaa770057f53d1c77))
* add caching service worker ([92b43cc](https://github.com/Eik-S/qwixx/commit/92b43cccc8c3ef2a52a3bc8640d85315341c3e7e))
* add control panel to set number of players or restart the game ([48f1809](https://github.com/Eik-S/qwixx/commit/48f18099cec53bdc9f18e86c51d8c0e53585f986))
* add done button for everyone ([0a1bfb3](https://github.com/Eik-S/qwixx/commit/0a1bfb3095814b8ce5ad5d3ccb778d6866a001b5))
* add finished screen with player wins as crowns ([7c3070e](https://github.com/Eik-S/qwixx/commit/7c3070e6e389ddab93a3bab6ac8839e4386069fb))
* add next-pwa for offline availability ([058016a](https://github.com/Eik-S/qwixx/commit/058016a1dea60e0a9123a1d46a3be6369e4b2cf9))
* add player name & avatar selection saved in local storage ([8b8dec3](https://github.com/Eik-S/qwixx/commit/8b8dec3e5fb73ca4617ffbd741ea1ed79888504e))
* add release-please action ([141f3fb](https://github.com/Eik-S/qwixx/commit/141f3fbca1310423bcf591544ebbd3812e7585ea))
* add time modes ([eedd5a0](https://github.com/Eik-S/qwixx/commit/eedd5a058a9cc5e79c2640d04d3618f1bdcfa72c))
* add visual pulsing if timer runs out ([41bf550](https://github.com/Eik-S/qwixx/commit/41bf550d16cebb474fcf0992e66ed74a47bf5aca))
* allow 4 players ([c0ab353](https://github.com/Eik-S/qwixx/commit/c0ab35307b99c4e5f94c56882b4f6abc448e9acf))
* allow move on touch down ([1d49852](https://github.com/Eik-S/qwixx/commit/1d49852ab0ef8654cbb770037261dae3abe44720))
* cleaner control panel design ([ca3fc8e](https://github.com/Eik-S/qwixx/commit/ca3fc8eb4292fc0fc478db10ffd5be1fcad1fee6))
* confetti ([73a1b5b](https://github.com/Eik-S/qwixx/commit/73a1b5bab32249727d19516edb8278414e7f9fd5))
* emoji font ([ca3fc8e](https://github.com/Eik-S/qwixx/commit/ca3fc8eb4292fc0fc478db10ffd5be1fcad1fee6))
* improve move state by auto locking if all turns are made ([60c21ae](https://github.com/Eik-S/qwixx/commit/60c21aec4e22f3352eb9aa9e38635a93eca1acce))
* increase accessibility by setting useful labels ([3e0c6d9](https://github.com/Eik-S/qwixx/commit/3e0c6d9409b6b39cdc7aafa426adda95eb03b8c9))
* move website to AWS ([f429571](https://github.com/Eik-S/qwixx/commit/f429571c393b57172cc81385c50e0134ed6e2b9a))
* naive possible moves check ([238b9b3](https://github.com/Eik-S/qwixx/commit/238b9b3006f59be1ba458c2c136679337b0bb61c))
* narrow gameboard design for &gt; 2 players ([c0ab353](https://github.com/Eik-S/qwixx/commit/c0ab35307b99c4e5f94c56882b4f6abc448e9acf))
* player which starts new game has first move ([06bdcc9](https://github.com/Eik-S/qwixx/commit/06bdcc9974f22fe05c5362b607a560e88c5763de))
* strict possible moves check ([866427a](https://github.com/Eik-S/qwixx/commit/866427abb2bbd6dfbcdb627424a1edbe71c3fd0c))
* switch to pointer events ([f8deb66](https://github.com/Eik-S/qwixx/commit/f8deb6694dcfafb1ea9388e3e91f1d239a56bcb5))
* switch to vite for dev server and bundling ([c8a3e32](https://github.com/Eik-S/qwixx/commit/c8a3e32699b8c83ea23f500c590601e6ef8662d4))


### Bug Fixes

* always allow deselection ([67bbed1](https://github.com/Eik-S/qwixx/commit/67bbed10bb7add8bf18181e534174170a1ff4937))
* change numberOfStrikes to end game back to 4 ([5a0c84a](https://github.com/Eik-S/qwixx/commit/5a0c84ab724b6a37b8f6c06ae2b7fb1fc36b1b6b))
* end game after one player has 4 strikes ([6ba7983](https://github.com/Eik-S/qwixx/commit/6ba7983267a39835a0ef666f8fe9a3adc883a5e4))
* flickering by disabling server side app rendering ([2e5bf95](https://github.com/Eik-S/qwixx/commit/2e5bf95bc74bf195a6dc63a59832d32ff46205c3))
* game now ends also if 3 lines are closed ([06bdcc9](https://github.com/Eik-S/qwixx/commit/06bdcc9974f22fe05c5362b607a560e88c5763de))
* ignoring next out folder ([95cbb0b](https://github.com/Eik-S/qwixx/commit/95cbb0b3d09080bc956afcc8adf5597c35cc035d))
* line now also closes when player adds 2 crosses that turn ([06bdcc9](https://github.com/Eik-S/qwixx/commit/06bdcc9974f22fe05c5362b607a560e88c5763de))
* narrow layout buttons ([be3e96f](https://github.com/Eik-S/qwixx/commit/be3e96f301f7bf7ebb58d299dd73aaf8de4b5c3a))
* no-scroll fullscreen on all devices ([1fe0b24](https://github.com/Eik-S/qwixx/commit/1fe0b240ab4d4128f61f85c0d345aeb1fa752163))
* remove uninstalled dependency from session-storage ([71e1e39](https://github.com/Eik-S/qwixx/commit/71e1e398f2ce4e68816eb6a627f6496b9a80e214))
* setClosedLineColors implementation ([6ba7983](https://github.com/Eik-S/qwixx/commit/6ba7983267a39835a0ef666f8fe9a3adc883a5e4))
* several bugs with state handling ([552742b](https://github.com/Eik-S/qwixx/commit/552742ba2b3e503905afda782c383214d888e2b5))
* strike reset on new game ([6ba7983](https://github.com/Eik-S/qwixx/commit/6ba7983267a39835a0ef666f8fe9a3adc883a5e4))
* total score calculation ([f01f363](https://github.com/Eik-S/qwixx/commit/f01f3630c9402fc0f9faa14ddb85cdad726b84e2))
* wrong number of crosses in a line to be able to close it ([6ba7983](https://github.com/Eik-S/qwixx/commit/6ba7983267a39835a0ef666f8fe9a3adc883a5e4))
