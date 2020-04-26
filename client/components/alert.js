import React from "react";
import PropTypes from 'prop-types';

const Alert = ({message, type = 'alert-danger', size = 'col-md-6'}) => (
    <div className="row justify-content-center p-2">
        <div className={size}>
            <div className={`alert ${type}`} role="alert">
                {message}
            </div>
        </div>
    </div>
);

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.string
};

export default Alert;

