import { useEffect, useState } from "react";
import styled from "styled-components";
import emails from "../../assets/emails";
import { orderListByTime } from "../../assets/helper";
import EmailDisplay from "../../components/email-display/email-display";
import EmailSidebar from "../../components/email-sidebar/email-sidebar";
import FinishedDialog from "../../components/finished-dialog/finished-dialog";
import NavBar from "../../components/nav-bar/nav-bar";

const EmailSidebarContainer = styled.div`
  width: 400px;
  height: 100%;
  padding: 0;
  margin: 0;
`;

const EmailDisplayContainer = styled.div`
  padding: 20px;
  width: 100%;
  min-height: 50vh;
`;

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  height: 100%;
`;


// Grab saved list from localstorage so user doesn't start again
const savedEmailList = JSON.parse(localStorage.getItem("phishme_emailList"));
// const savedEmailList = null;
const savedScamList = JSON.parse(localStorage.getItem("phishme_scamList"));
const savedShowResult = JSON.parse(localStorage.getItem("phishme_showResult"));
// const savedScamList = null;
orderListByTime(emails);

export default function Result(props) {
  const [selectedEmail, setSelectedEmail] = useState();
  const [scamList, setScamList] = useState(savedScamList ?? []);
  const [emailList, setEmailList] = useState(
    savedEmailList ?? JSON.parse(JSON.stringify(emails))
  );
  const [isScamSelected, setIsScamSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [showResult, setShowResult] = useState(savedShowResult ?? false);
  const [result, setResult] = useState({});

  function selectEmail(index) {
    emailList[index]['read'] = true;
    setIsScamSelected(false);
    setSelectedEmail(emailList[index]);
    setEmailList([...emailList]);
  }

  function selectScamEmail(index) {
    setIsScamSelected(true);
    setSelectedEmail(scamList[index]);
  }

  function findEmailIndex(selectedEmail) {
    return emailList.findIndex((email) => selectedEmail == email);
  }

  function findScamEmailIndex(selectedEmail) {
    return scamList.findIndex((email) => selectedEmail == email);
  }

  function addToScamList() {
    const index = findEmailIndex(selectedEmail);
    if (index < 0) return;
    let newScamList = [...scamList, emailList[index]];
    orderListByTime(newScamList);
    setScamList(newScamList);
    emailList.splice(index, 1);
    orderListByTime(emailList);
    setEmailList([...emailList]);
    setSelectedEmail(null);
  }

  function removeFromScamList() {
    const index = findScamEmailIndex(selectedEmail);
    if (index < 0) return;
    let newEmailList = [...emailList, scamList[index]];
    orderListByTime(newEmailList);
    setEmailList(newEmailList);
    scamList.splice(index, 1);
    orderListByTime(scamList);
    setScamList([...scamList]);
    setSelectedEmail(null);
  }

  function finishTest() {
    const scamsMissed = emailList.filter((email) => !!email.scam);
    const normalsCaught = scamList.filter((email) => !email.scam);
    const totalScamsCaught = scamList.length - normalsCaught.length;
    return {missed: scamsMissed.length, accidental: normalsCaught.length, caught: totalScamsCaught};
  }

  const showResults = () => {
    emailList.map(email => {
      email.correct = !email.scam;
      return email;
    });
    setEmailList([...emailList]);
    scamList.map((email) => {
      email.correct = email.scam;
      return email;
    });
    setScamList([...scamList]);
  }

  const handleClickOpen = () => {
    const results = finishTest();
    setResult(results);
    setOpen(true);
  };

  const handleClickReset = () => {
    localStorage.removeItem('phishme_scamList');
    localStorage.removeItem("phishme_emailList");
    localStorage.removeItem("phishme_showResult");
    setScamList([]);
    setEmailList(JSON.parse(JSON.stringify(emails)));
    setSelectedEmail(null);
    setShowResult(false);
    setOpen(false);
    setIsScamSelected(false);
    setResult({});
  };

    const handleClose = (isFinished) => {
      isFinished && showResults();
      setShowResult(isFinished);
      setOpen(false);
    };

  useEffect(() => {
    localStorage.setItem("phishme_scamList", JSON.stringify(scamList));
  }, [scamList]);

  useEffect(() => {
    localStorage.setItem("phishme_emailList", JSON.stringify(emailList));
  }, [emailList]);

  useEffect(() => {
    localStorage.setItem("phishme_showResult", showResult);
  }, [showResult]);

  return (
    <>
      <NavBar openClick={handleClickOpen} resetClick={handleClickReset}/>
      <Container>
        <EmailSidebarContainer>
          <div style={{ height: "100%" }}>
            <EmailSidebar
              emailList={emailList}
              scamList={scamList}
              selectEmail={selectEmail}
              selectScamEmail={selectScamEmail}
              selectedEmail={selectedEmail}
              showResult={showResult}
            />
          </div>
        </EmailSidebarContainer>
        <EmailDisplayContainer>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Click here when finished
          </Button>
          <Button variant="outlined" onClick={handleClickReset}>
            Reset
          </Button> */}
          <FinishedDialog
            open={open}
            handleClose={handleClose}
            result={result}
          ></FinishedDialog>
          <EmailDisplay
            selectedEmail={selectedEmail}
            isScamEmail={isScamSelected}
            add={addToScamList}
            remove={removeFromScamList}
          ></EmailDisplay>
        </EmailDisplayContainer>
      </Container>
    </>
  );
}
