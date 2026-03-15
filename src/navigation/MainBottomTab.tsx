import { View, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard/Dashboard';
import EnergyAnalytics from '../screens/EnergyAnalytics/EnergyAnalytics';
import { screenHeight, screenWidth } from '../constant';

function TabBar({ state, descriptors, navigation }) {
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", backgroundColor:'#FFFFFF'}}
          >
                 <View
                    style={{
                    width: screenWidth / 2,
                    height: 48,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isFocused ? "#4F46E5" : "grey",
                    flexDirection: "row",
                    paddingHorizontal: 12,
                    }}
                >
                    <Text
                    style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: 14,
                    }}
                    >
                    {label}
                    </Text>
                </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator  
     screenOptions={{
        headerShown: false,
      }} 
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen  name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Energy" component={EnergyAnalytics} />
    </Tab.Navigator>
  );
}