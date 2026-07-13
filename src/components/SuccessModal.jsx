import React from 'react';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6 sm:p-10">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <i className="fa-solid fa-check text-green-600"></i>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white" id="modal-title">
                  Message Sent Successfully!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Thank you for contacting Learnify. We have received your message and will get back to you shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
