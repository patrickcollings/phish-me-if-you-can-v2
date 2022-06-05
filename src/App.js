import logo from './logo.svg';
import './App.css';
import Result from './views/result/result';
import WelcomeDialog from './components/welcome-dialog.js/welcome-dialog';
import { useState } from 'react';
import mixpanel from "mixpanel-browser";

mixpanel.init("2e8c366f7230134973d763a5f39fcf43", { debug: true });

const hideWelcomeDialog = !!localStorage.getItem('phishme_hide_welcome_dialog');

function App() {
  const [open, setOpen] = useState(!hideWelcomeDialog);

  const handleClose = (hideDialog = false) => {
    if (hideDialog) localStorage.setItem('phishme_hide_welcome_dialog', true)
    setOpen(false);
  }
  return (
    <div className="App" style={{ maxHeight: "100vh", height: "100vh" }}>
      <WelcomeDialog open={open} handleClose={handleClose} />
      <Result></Result>
    </div>
  );
}

export default App;
