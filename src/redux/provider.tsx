import { store } from './store'
import { Provider } from 'react-redux'
import { persistor} from './store.ts'
import { PersistGate } from 'redux-persist/integration/react'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
}
