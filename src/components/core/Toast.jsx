import React, { useEffect, useRef } from 'react';
import { Toast as BootstrapToast } from 'bootstrap'; 
import { useStateContext } from '../../contexts/ContextProvider';

function Toast() {
    const toastRef = useRef(null);
    const { notification, setNotification } = useStateContext();

    useEffect(() => {
        if (notification) {
            const toastEl = toastRef.current;
            const toast = new BootstrapToast(toastEl, { delay: 5000 });
            toast.show();

            const hideTimeout = setTimeout(() => {
                toast.hide();
                setNotification(false);
            }, 5000);

            return () => clearTimeout(hideTimeout);
        }
    }, [notification, setNotification]);

    return (
        <div className={`toast align-items-center text-bg-${notification?.type} border-0`} role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
            <div className="d-flex">
                <div className="toast-body">
                    {notification?.message}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    );
}

export default Toast;
