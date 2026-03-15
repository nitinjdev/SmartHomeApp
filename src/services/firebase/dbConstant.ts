import { getApp } from "@react-native-firebase/app";
import { getDatabase } from "@react-native-firebase/database";


const app = getApp();
const db = getDatabase(app);

export {db}