
import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Text, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToEnergyLogs } from '../../services/firebase/energyService';
import { setEnergyError, setEnergyLoading, setEnergyLogs } from '../../redux/energy/energySlice';
import DeviceEnergyChart from '../../component/DeviceCard/DeviceEnergyChart';
import { LocalString } from '../../constant/StringConst';
import { DeviceEnergyItem, RootState } from '../../types/energy/energytype';
import { buildDeviceEnergyAnalytics, getLast7Days } from '../../util';
import { chartConfig, styles } from './styles';
import CustomText from '../../component/CustomText';
import { primaryColor } from '../../constant/theme/color';


function EnergyAnalytics() {
    const dispatch = useDispatch();

    const devices = useSelector((state: RootState) => state.devices.items);
    const energyLogs = useSelector((state: RootState) => state.energy.logs);

    const deviceAnalytics = useMemo(() => {
        const last7Days = getLast7Days();
        return buildDeviceEnergyAnalytics(devices, energyLogs, last7Days);
    }, [devices, energyLogs]);

    useEffect(() => {
        dispatch(setEnergyLoading(true));

        const unsubscribe = subscribeToEnergyLogs(
            logs => {
                dispatch(setEnergyLogs(logs));
            },
            err => {
                dispatch(setEnergyError(err.message));
            }
        );

        return unsubscribe;
    }, [dispatch]);

    const renderItem = useCallback(({ item }:{item : DeviceEnergyItem}) => {
        return (
          <DeviceEnergyChart
            item={item}
            chartConfig={chartConfig}
            styles={styles}
          />
        );
      }, []);

      if (!devices.length) {
        return (
            <View style={styles.center}>
                <Text>{LocalString.DEVICE_NOT_FOUND}</Text>
            </View>
        );
    }

    return (
        <>
        <View style={{alignItems: 'center', marginTop:30}}>
            <CustomText value='Energy Analytics' fontSize={24} fontWeight='400' color={primaryColor}/>
            </View>
        <FlatList
            data={deviceAnalytics}
            keyExtractor={(item) => item.deviceId}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={3}
            removeClippedSubviews
        />
        </>
    );
}

export default EnergyAnalytics;

