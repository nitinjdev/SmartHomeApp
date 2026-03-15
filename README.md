# SmartHome React Native App

## Overview

SmartHome is a React Native application that allows authenticated users to monitor and control smart home devices.
The application uses Firebase Authentication for login and Firebase Realtime Database for storing and syncing device states in real time.

---

# Firebase Setup Instructions

The project uses **React Native Firebase** for integration with Firebase services.

Official documentation followed:
https://rnfirebase.io/

## Steps

1. Go to the **Firebase Console** and create a new project.

2. Register an Android application inside the project.

3. Download the **`google-services.json`** file from Firebase console.

4. Place the file in the following directory:

```
android/app/google-services.json
```

5. Update `android/build.gradle`:

6. Install Firebase dependencies:

```
npm install @react-native-firebase/app
npm install @react-native-firebase/auth
npm install @react-native-firebase/database
```

7. Run the project:

```
npx react-native run-android
```

---

# Authentication

Authentication is implemented using **Email and Password** through **Firebase Authentication**.

Features:

* User login using email and password
* Secure token management
* Persistent login session
* Logout functionality

---

# Realtime Database

Device data is stored and synced using **Firebase Realtime Database**.

Capabilities:

* Real-time device status updates
* Device toggle functionality
* Automatic UI updates when database values change

# React Native Component Architecture

The project follows a **modular and scalable component architecture**.

## Folder Structure

```
src
 ├── components
 │   ├── DeviceCard
 │   ├── CustomButton
 │   ├── CustomInput
 │   └── Loader
 │
 ├── screens
 │   ├── Login
 │   └── Dashboard
 |   └── Energy
 │
 ├── redux
 │   ├── auth
 │   └── devices
 |   └── Energy
 │
 ├── services
 │   └── firebase
 │
 ├── navigation
 │   └── AppNavigator
 │
 └── utils
```

## Architecture Principles

* **Separation of concerns**
* **Reusable UI components**
* **Redux Toolkit for global state management**
* **Firebase service layer abstraction**
* **Optimistic UI updates for device toggles**

---

# State Management

The app uses **Redux Toolkit**.

Features:

* Centralized application state
* Device update tracking
* Async actions for Firebase operations
* Persistent authentication state

---

# Security

Sensitive information such as tokens and credentials are stored securely using:

* **react-native-encrypted-storage**
* **AsyncStorage** (for Redux persistence)

---

# Known Limitations

1. The project currently supports **Android only**.
2. Offline synchronization is limited without additional caching mechanisms.
3. Error handling can be improved.

---

# Technologies Used

* **React Native**
* **TypeScript**
* **React Native Firebase**
* **Redux Toolkit**
* **Firebase Realtime Database**
* **Firebase Authentication**

---
