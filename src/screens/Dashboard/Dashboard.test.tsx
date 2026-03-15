import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Dashboard from "./Dashboard";

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
  
test("renders dashboard title", () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText("Dashboard")).toBeTruthy();
});



describe("Dashboard Screen", () => {
  test("renders dashboard title", () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText("Dashboard")).toBeTruthy();
  });

  test("renders LineChart component", () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId("line-chart")).toBeTruthy(); // Ensure the LineChart has a testID
  });

  test("renders a button and handles click", () => {
    const { getByText } = render(<Dashboard />);
    const button = getByText("Refresh"); // Assuming there's a button with text "Refresh"
    fireEvent.press(button);
    expect(getByText("Refreshing...")).toBeTruthy(); // Check if the state changes
  });

  test("displays data passed as props", () => {
    const mockData = { title: "Custom Dashboard" };
    const { getByText } = render(<Dashboard data={mockData} />);
    expect(getByText("Custom Dashboard")).toBeTruthy();
  });

  test("handles empty data gracefully", () => {
    const { getByText } = render(<Dashboard data={{}} />);
    expect(getByText("No data available")).toBeTruthy(); // Assuming this is the fallback text
  });
});