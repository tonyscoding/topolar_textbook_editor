import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import 'assets/sass/InputFieldWithLabel.scss';

// fieldKey: name, username, mobile, password
// className=inline-container 추가시 2개 이상의 Elem 한줄로
const InputFieldWithLabel = ({children, label}) => {
    return (
        <section className="input-field-with-label">
            <label>{label}</label>
            {children}
        </section>
    )
}

export default InputFieldWithLabel;