import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa',
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        color: '#111',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 12,
        color: '#222',
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 12,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    cardLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },
    chart: {
        borderRadius: 12,
        marginVertical: 8,
    },
    chipsRow: {
        marginBottom: 8,
    },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: '#e9edf2',
        marginRight: 10,
    },
    chipActive: {
        backgroundColor: '#2280b0',
    },
    chipText: {
        color: '#333',
        fontWeight: '500',
    },
    chipTextActive: {
        color: '#fff',
    },
});


export const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    propsForDots: {
        r: '5',
        strokeWidth: '2',
        stroke: '#2280b0',
    },
};