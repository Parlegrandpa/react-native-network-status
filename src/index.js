import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

let networkHistory = [];

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState({
    isConnected: null,
    type: "unknown",
  });

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      updateStatus(state);
    });
    const unsubscribe = NetInfo.addEventListener(updateStatus);
    return () => unsubscribe();
  }, []);

  const updateStatus = (state) => {
    const newStatus = {
      isConnected: state.isConnected,
      type: state.type,
      timestamp: Date.now(),
    };
    setNetworkStatus(newStatus);
    networkHistory = [newStatus, ...networkHistory].slice(0, 10); // Keep last 10
  };

  return { ...networkStatus, history: networkHistory };
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
