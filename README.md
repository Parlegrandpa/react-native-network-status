# react-native-network-status

A lightweight, easy-to-use library for monitoring network connectivity in React Native applications. Built on top of `@react-native-community/netinfo`, this library provides a simple hook and utility functions to track network status with minimal setup.

## Features

- **Simple Hook:** Use `useNetworkStatus` to get real-time network updates in functional components.
- **Manual Fetch:** Use `getNetworkStatus` to check the current network state on demand.
- **Consistent API:** Returns a predictable `{ isConnected, type }` object.
- **Lightweight:** Minimal abstraction over `NetInfo` for ease of use without bloat.
- **Configurable:** Customize underlying `NetInfo` settings if needed.

## Installation

1. Install the library via npm:
   ```bash
   npm install react-native-network-status
   ```
2. Install the library via npm:
   ```bash
   Ensure the peer dependency `@react-native-community/netinfo` is installed and linked:
   ```

For React Native 0.60+, autolinking handles the rest. For older versions, follow the [NetInfo setup guide](https://github.com/react-native-netinfo/react-native-netinfo#react-native-059-and-below).

## Usage

- **Hook:** `useNetworkStatus`

Monitor network status in real time with the useNetworkStatus hook:

```javascript
import React from "react";
import { Text, View } from "react-native";
import { useNetworkStatus } from "react-native-network-status";

const MyComponent = () => {
  const { isConnected, type } = useNetworkStatus();

  return (
    <View>
      <Text>
        Status:{" "}
        {isConnected === null
          ? "Checking..."
          : isConnected
          ? "Online"
          : "Offline"}
      </Text>
      <Text>Connection Type: {type}</Text>
    </View>
  );
};

export default MyComponent;
```

- `isConnected: boolean | null - true` if connected, `false` if not, `null` while loading initial state.

- `type: string` - Network type (e.g., `wifi, cellular, none, unknown`).

## Function: `getNetworkStatus`

Fetch the current network status manually:

```javascript
import { getNetworkStatus } from "react-native-network-status";

const checkNetwork = async () => {
  const status = await getNetworkStatus();
  console.log(status); // { isConnected: true, type: 'wifi' }
};
```

Returns a promise resolving to `{ isConnected, type }`.

## Configuration: `configureNetworkStatus`

Optionally configure the underlying `NetInfo` behaviour:

```javascript
import { configureNetworkStatus } from "react-native-network-status";

configureNetworkStatus({
  reachabilityUrl: "https://my-custom-endpoint.com",
  reachabilityTest: (response) => response.status === 200,
});
```

See the [NetInfo configuration docs](https://github.com/react-native-netinfo/react-native-netinfo#configure) for all options.

## Why Use This Library?

Unlike `@react-native-community/netinfo`, which provides a low-level API requiring manual subscription and state management, `react-native-network-status` offers:

- A React hook for seamless integration with modern React Native apps.
- A simplified API focused on the most common use cases (isConnected and type).
- Less boilerplate, faster setup, and a consistent return shape.

If you need advanced features or raw control, consider using `NetInfo` directly. For quick and easy network status tracking, this library is your go-to solution.

## Example App

Here’s a full example combining the hook and manual fetch:

```javascript
import React from "react";
import { Text, View, Button } from "react-native";
import {
  useNetworkStatus,
  getNetworkStatus,
} from "react-native-network-status";

const App = () => {
  const { isConnected, type } = useNetworkStatus();

  const checkManually = async () => {
    const status = await getNetworkStatus();
    alert(`Connected: ${status.isConnected}, Type: ${status.type}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Live Status: {isConnected ? "Online" : "Offline"}</Text>
      <Text>Type: {type}</Text>
      <Button title="Check Manually" onPress={checkManually} />
    </View>
  );
};

export default App;
```

## Requirements

- React Native >= 0.60.0
- React >= 16.8.0 (for hooks)

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on [GitHub](https://github.com/Parlegrandpa/react-native-network-status).

## License

MIT License. See LICENSE for details.

## Acknowledgments

Built with by **Parlegrandpa**. Powered by `@react-native-community/netinfo`.
