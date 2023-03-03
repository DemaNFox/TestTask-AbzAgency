import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { setupStore } from "./store/store"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

// const store = setupStore()

root.render(
  <div>
    <Provider store={setupStore}>
      <App />
    </Provider>
  </div>
)
