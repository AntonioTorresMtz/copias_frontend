import React from "react";

const Modal = () => {
  return (
    <div className="fixed inset-0 color-modal, backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end">x</button>
        <div className="bg-white p-2 rounded">Modal</div>
        </div>
    </div>
  );
};

export default Modal;
