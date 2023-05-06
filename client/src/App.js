import "./App.css";
import {Helmet} from "react-helmet";
import { Layout, Button , ConfigProvider, } from "antd";
import CurrentBalance from "./componets/CurrentBalance";
import RequestAndPay from "./componets/RequestAndPay";
import AccountDetails from "./componets/AccountDetails";
import RecentActivity from "./componets/RecentActivity";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";
import { useState, useEffect } from "react";


const { Header, Content } = Layout;

function App() {


  const [name, setName] = useState("...");
  const [balance, setBalance] = useState("...");
  const [dollars, setDollars] = useState("...");
  const [history, setHistory] = useState(null);
  const [requests, setRequests] = useState({ "1": [0], "0": [] });



    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect({
      connector: new MetaMaskConnector(),
    });

    function disconnectAndSetNull() {
      disconnect();
      setName("...");
      setBalance("...");
      setDollars("...");
      setHistory(null);
      setRequests({ "1": [0], "0": [] });
    }



    async function getNameAndBalance() {
      const res = await axios.get(`https://spadpal-nindex-server.onrender.com/getNameAndBalance`, {
        params: { userAddress: address },
      });
  
      const response = res.data;
      console.log(response.requests);
      if (response.name[1]) {
        setName(response.name[0]);
      }
      setBalance(String(response.balance));
      setDollars(String(response.dollars));
      setHistory(response.history);
      setRequests(response.requests);
      
    }

    useEffect(() => {
      if (!isConnected) return;
      getNameAndBalance();
    }, [isConnected]);



  return (

    <>
    <Helmet>
        <title>SPADPAL</title>
        <meta name="description" content="WEB3 PAYPAL" />
        
    </Helmet>
    <div className="App">
        <Layout>
          <Header className="header">
            <div className="headerLeft">
              <img src='https://raw.githubusercontent.com/sprdgx/Photos/main/spadpal.png' alt="logo" className="logo" />
              {isConnected && (
                <>
                  <div
                    className="menuOption"
                    style={{ borderBottom: "1.5px solid black" }}
                  >
                    Summary
                  </div>
                  <div className="menuOption">Activity</div>
                  <div className="menuOption">{`Send & Request`}</div>
                  <div className="menuOption">Wallet</div>
                  <div className="menuOption">Help</div>
                </>
              )}
            </div>
            {isConnected ?
              <ConfigProvider theme={{ token: { colorPrimary: 'white' } }}>
                <Button style={{ color: "black" }} type={"primary"} onClick={() => { disconnectAndSetNull(); } }>Disconnect Wallet</Button>
              </ConfigProvider>
              :
              <ConfigProvider theme={{ token: { colorPrimary: 'white' } }}>
                <Button style={{ color: "black" }} type={"primary"} onClick={() => { connect(); } }>Connect Wallet</Button>
              </ConfigProvider>}


          </Header>
          <Content className="content">
            {isConnected ? (
              <>
                <div className="firstColumn">
                  <CurrentBalance dollars={dollars} />
                  <RequestAndPay requests={requests} getNameAndBalance={getNameAndBalance} />
                  <AccountDetails
                    address={address}
                    name={name}
                    balance={balance} />
                </div>
                <div className="secondColumn">
                  <RecentActivity history={history} />
                </div>
              </>
            ) : (
              <div className="plsLogin">
                <h2>Hey there, we're thrilled to see you again! ❤️ </h2>
                <h1>Please Log In with your MeTaMask so you can access all the features!! 😁 </h1>
              </div>
            )}
          </Content>
        </Layout>
      </div></>
  );
}

export default App;
