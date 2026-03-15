import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceCard from '../../component/DeviceCard/DeviceCard';
import {
    setDevices,
    setDevicesError,
    setDevicesLoading,
    startDeviceUpdate,
    finishDeviceUpdate,
    updateDeviceStatusLocally,
} from '../../redux/devices/deviceSlice';
import {
    subscribeToUserDevices,
    toggleDeviceStatus,
} from '../../services/firebase/deviceService';
import Loader from '../../component/Loader';
import { LocalString } from '../../constant/StringConst';
import { toggleStatus } from '../../util';
import { Device, DeviceStatus } from '../../types/device/deviceTypes';
import CustomText from '../../component/CustomText';
import { primaryColor } from '../../constant/theme/color';
import CustomButton from '../../component/CustomButton';
import { getAuth, signOut } from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import { asyncStorage, persistor } from '../../redux/store';
import { updateUserLoggedStatus } from '../../redux/auth/authSlice';

function Dashboard() {

    const dispatch = useDispatch();

    const devices = useSelector((state: any) => state.devices.items);
    const loading = useSelector((state: any) => state.devices.loading);
    const error = useSelector((state: any) => state.devices.error);
    const updatingIds = useSelector((state: any) => state.devices.updatingIds);
    const userUID = useSelector((state: any) => state.auth.userInfo?.userUID);

    useEffect(() => {

        if (!userUID) {
            dispatch(setDevicesLoading(false));
            dispatch(setDevicesError(LocalString.USER_NOT_AUTHRISED));
            return;
        }

        dispatch(setDevicesLoading(true));

        const unsubscribe = subscribeToUserDevices(
            userUID,
            items => {
                dispatch(setDevices(items));
            },
            err => {
                dispatch(setDevicesError(err.message));
            }
        );

        return unsubscribe;
    }, [dispatch, userUID]);


    const onToggle = async (deviceId: string, currentStatus: DeviceStatus) => {

        const nextStatus = toggleStatus(currentStatus);
        try {
            dispatch(startDeviceUpdate(deviceId));
            // update UI instantly
            dispatch(updateDeviceStatusLocally({ deviceId, status: nextStatus }));
            await toggleDeviceStatus(deviceId, nextStatus);
        } catch (e: any) {
            // revert if API fails
            dispatch(updateDeviceStatusLocally({ deviceId, status: currentStatus }));
            dispatch(setDevicesError(e?.message || LocalString.FAILED_UPDATE_device));
        } finally {
            dispatch(finishDeviceUpdate(deviceId));
        }
    };

    const renderItem = ({ item }: { item: Device })  => (
        <DeviceCard
            device={item}
            disabled={updatingIds.includes(item.id)}
            onToggle={() => onToggle(item.id, item.status)}
        />

    );
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    const onLogout= async()=>{
        try {
            const auth = getAuth();
            await signOut(auth);
            await asyncStorage.clear();
            await EncryptedStorage.clear();
            await persistor.purge();
            dispatch(updateUserLoggedStatus(false));
        } catch (error) {
            ToastAndroid.show('Logout failed', ToastAndroid.LONG)
        }
        
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop:30, flexDirection:'row', marginHorizontal:20, justifyContent:'space-between'}}>
            <CustomText value='Dashboard' fontSize={24} fontWeight='400' color={primaryColor}/>
            <Pressable style={{backgroundColor:'grey', padding:10, borderRadius:10}} onPress={onLogout}>
                <CustomText value={LocalString.LOGOUT} fontSize={12} fontWeight='700' color={primaryColor}/>
            </Pressable>
            </View>
            <FlatList
               contentContainerStyle={{flex:1, marginTop:50}}
                data={devices}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

export default Dashboard;