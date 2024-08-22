import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface PopupModalType {
    title: string,
    children: ReactNode,
    isOpen: boolean,
    onClickModal: () => void
}

const PopupModal: React.FC<PopupModalType> = ({title, children, isOpen, onClickModal}) => {
  
  const handleOk = () => {
    onClickModal()
  };

  const handleCancel = () => {
    onClickModal()
  };

  return (
      <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
            {children}
      </Modal>
  );
};

export default PopupModal;