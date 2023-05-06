import React, { useState } from "react";import { Card, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import matic from "../matic.png";


function AccountDetails({ address , name , balance }) {


  
  
  const [addname, setAddName] = useState("");




  return (
    <Card title="Account Details" style={{ width: "100%" , background:'#43A047' }}>
      <div className="accountDetailRow">
        <UserOutlined style={{ color: "white", fontSize: "25px" }} />
        <div>
          <div className="accountDetailHead"> {name} </div>
          <div className="accountDetailBody">
            {" "}
            Address: { `${address.slice(0, 4)}...${address.slice(38)}` }
          </div>
        </div>
      </div>
      <div className="accountDetailRow">
        <img src={matic} alt="maticLogo" width={25} />
        <div>
          <div className="accountDetailHead"> Native Matic Tokens</div>
          <div className="accountDetailBody">{balance} Matic</div>
        </div>
      </div>
    </Card>
    
  );
}

export default AccountDetails;
