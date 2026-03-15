import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Dashboard from "./Dashboard";
import DeviceCard from "../../component/DeviceCard/DeviceCard";

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: (selector: any) =>
    selector({
      devices: {
        items: [],
        loading: false,
        error: null,
        updatingIds: [],
      },
      auth: {
        userInfo: {
          userUID: 'test-uid',
        },
      },
    }),
}));

jest.mock('@react-native-firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      currentUser: { uid: 'test-uid' },
    })),
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({
        user: { uid: 'test-uid' },
      })
    ),
    signOut: jest.fn(() => Promise.resolve()),
  }));
  jest.mock('../../services/firebase/deviceService', () => ({
    subscribeToUserDevices: jest.fn(() => {
      return jest.fn(); // unsubscribe
    }),
    toggleDeviceStatus: jest.fn(),
  }));
  
  jest.mock('@react-native-firebase/database', () => ({
    getDatabase: jest.fn(() => ({
      ref: jest.fn(() => ({
        on: jest.fn(),
        off: jest.fn(),
        child: jest.fn(),
        orderByChild: jest.fn(() => ({
          equalTo: jest.fn(),
          limitToLast: jest.fn(),
          startAt: jest.fn(),
          endAt: jest.fn(),
          isEqualTo: jest.fn(),
          isNotEqualTo: jest.fn(),
          isLessThanOrEqualTo: jest.fn(),
          isGreaterThan: jest.fn(),
          isLessThan: jest.fn(),
          limitToFirst: jest.fn(),
        })),
        limitToLast: jest.fn(),
        startAt: jest.fn(),
        endAt: jest.fn(),
        isEqualTo: jest.fn(),
        isNotEqualTo: jest.fn(),
        isLessThanOrEqualTo: jest.fn(),
        isGreaterThan: jest.fn(),
        isLessThan: jest.fn(),
      })),
    })),
  }));
  
  jest.mock('@react-native-firebase/app', () => ({
    getApp: jest.fn(),
  }));
  
  jest.mock('react-native-encrypted-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));
  
  jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
    createAsyncStorage: jest.fn(() => ({
      setItem: jest.fn(() => Promise.resolve()),
      getItem: jest.fn(() => Promise.resolve(null)),
      removeItem: jest.fn(() => Promise.resolve()),
    })),
  }));
  
  
  jest.mock('redux-persist', () => ({
    persistReducer: jest.fn((config, reducers) => reducers),
    persistStore: jest.fn(),
  }));
  
  // Mock chart library that Jest cannot compile (ESM module)
  jest.mock('react-native-chart-kit', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
      LineChart: () => React.createElement(View, null),
    };
  });
  
  const devices = [
    {
      id: "device_001",
      name: "Living Room Light",
      type: "light",
      status: "on",
      room: "Living Room",
      powerWatts: 60,
      energyUsedKWh: 1.24,
    },
    {
      id: "device_002",
      name: "Smart Socket — Kitchen",
      type: "socket",
      status: "off",
      room: "Kitchen",
      powerWatts: 1500,
      energyUsedKWh: 5.82,
    }
  ];

describe("Dashboard Screen", () => {
  test("renders dashboard title", () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText("Dashboard")).toBeTruthy();
  });

  test("renders a button and handles click", () => {
    const { getByTestId} = render(<Dashboard />);
    const button = getByTestId('logout-btn');
    expect(button).toBeTruthy();
  });

  test("renders device items in FlatList", () => {

    const { getByText } = render(
      <>
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            disabled={false}
            onToggle={jest.fn()}
          />
        ))}
      </>
    );
  
    expect(getByText("Living Room Light")).toBeTruthy();
    expect(getByText("Smart Socket — Kitchen")).toBeTruthy();
  });

  test("switch toggle triggers onToggle", () => {

    const mockToggle = jest.fn();
  
    const device = {
      id: "device_001",
      name: "Living Room Light",
      status: "on",
      room: "Living Room",
      powerWatts: 60,
      energyUsedKWh: 1.24,
    };
  
    const { getByTestId } = render(
      <DeviceCard
        device={device}
        disabled={false}
        onToggle={mockToggle}
      />
    );
  
    const switchButton = getByTestId("switch-device_001");
  
    fireEvent(switchButton, "valueChange", false);
  
    expect(mockToggle).toHaveBeenCalled();
  });

});