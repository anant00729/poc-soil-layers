import { AppContainer } from './styles'
import Home from './pages/home';
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <AppContainer>
      <GlobalProvider>
        <Home/>
      </GlobalProvider>
    </AppContainer>
  );
}

export default App;
