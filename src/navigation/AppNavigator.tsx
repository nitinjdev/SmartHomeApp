import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard/Dashboard";
import EnergyAnalytics from "../screens/EnergyAnalytics/EnergyAnalytics";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login/Login";
import React from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import { updateUserLoggedStatus } from "../redux/auth/authSlice";
import { MainTabs } from "./MainBottomTab";


const RootStack = createNativeStackNavigator();

function AppNavigator() {
    const { isUserLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    React.useEffect(() => {
        async function retrieveUserSession() {
            try {
                const session = await EncryptedStorage.getItem('user_session');

                if (session !== undefined && session !== null) {
                    dispatch(updateUserLoggedStatus(true));
                }
                //     setTimeout(() => {
                //       SplashScreen.hide();
                //   }, 2000); // 2 seconds delay

            } catch (error) {
                // There was an error on the native side
            }
        }
        retrieveUserSession();
    }, []);

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {!isUserLoggedIn ? (
                    <RootStack.Screen name="Login" component={Login} />
                ) : (
                    <RootStack.Screen name="MainTabs" component={MainTabs} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator