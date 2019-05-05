import { AppRegistry } from "react-native"
import { Container } from "./source"
import { name } from "./app.json"

console.ignoredYellowBox = ["Module iCloudStorage requires main queue setup"]

AppRegistry.registerComponent(name, () => Container)
