import { AppRegistry } from "react-native"
import { Container } from "./source"
import { name } from "./app.json"

AppRegistry.registerComponent(name, () => Container)
