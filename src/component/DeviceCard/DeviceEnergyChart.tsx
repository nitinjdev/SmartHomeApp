import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { screenWidth } from "../../constant";
import { DeviveEnergyChartProps } from "../../types/energy/energytype";

const DeviceEnergyChart = React.memo(({ item, chartConfig, styles }: DeviveEnergyChartProps) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    index: 0,
  });

  const chartData = useMemo(() => {
    return {
      labels: item.points.map(p => p.date.slice(5)),
      datasets: [
        {
          data: item.points.map(p => p.kwh),
        },
      ],
    };
  }, [item.points]);

  return (
    <View style={styles.card}>
      <Text>{item.deviceName}</Text>

      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="kWh"
        fromZero
        bezier
        chartConfig={chartConfig}
        style={styles.chart}
        onDataPointClick={(data) => {
          setTooltip({
            visible: true,
            x: data.x,
            y: data.y,
            index: data.index,
          });

          setTimeout(() => {
            setTooltip(prev => ({ ...prev, visible: false }));
          }, 2000);
        }}
        decorator={() => {
          if (!tooltip.visible) return null;

          const point = item.points[tooltip.index];

          return (
            <View
              style={{
                position: "absolute",
                left: tooltip.x - 40,
                top: tooltip.y - 60,
                backgroundColor: "#000",
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {point.kwh} kWh
              </Text>

              <Text style={{ color: "#fff", fontSize: 12 }}>
                ${point.cost}
              </Text>
            </View>
          );
        }}
      />

      <View style={styles.summaryRow}>
        <Text>Total: {item.totalKwh.toFixed(2)} kWh</Text>
        <Text>Avg/day: {item.averageDailyKwh.toFixed(2)}</Text>
        <Text>Cost: ${item.totalCost.toFixed(2)}</Text>
      </View>
    </View>
  );
});

export default DeviceEnergyChart;