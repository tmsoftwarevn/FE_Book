
import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';

const ResponsiveHeader = (props) => {
  
  const {open, setOpen} = props;
  const [placement, setPlacement] = useState('left');
  
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
     
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default ResponsiveHeader;