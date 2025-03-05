import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

// Hook to track network status
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState({
    isConnected: null, // null initially until we fetch status
    type: "unknown", // e.g., 'wifi', 'cellular', 'none', 'unknown'
  });

  useEffect(() => {
    // Fetch initial network status
    NetInfo.fetch().then((state) => {
      setNetworkStatus({
        isConnected: state.isConnected,
        type: state.type,
      });
    });

    // Subscribe to network status updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus({
        isConnected: state.isConnected,
        type: state.type,
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return networkStatus;
};

// Function to manually fetch current network status
export const getNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return {
    isConnected: state.isConnected,
    type: state.type,
  };
};

// Optional: Configure NetInfo globally (e.g., custom reachability URL)
export const configureNetworkStatus = (config) => {
  NetInfo.configure(config);
};
