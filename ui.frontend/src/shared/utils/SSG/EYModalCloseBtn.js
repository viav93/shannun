import React from 'react';

export const EYModalCloseBtn = (props) => {
    const closeLabel = props.closeLabel ? props.closeLabel : "Close";
    const { closeIcon = "" } = props || {};
    const defaultCloseIcon = "/content/dam/eag/shannun/selfservicehub/en/common/close.svg";
    return (
        <div className="custom-modal-close">
            <button type="button" className="close" data-dismiss="modal" aria-label={closeLabel} onClick={props.onHide}>
                <img aria-hidden="true" src={closeIcon !== "" ? closeIcon : defaultCloseIcon} alt="" />
            </button>
        </div>
    );
}