import React, { useState, useEffect } from 'react';
import { List } from 'react-virtualized/dist/commonjs/List';
import styled from 'styled-components';

const StyledList = styled(List)`
    background: #fff;
    width: 100%;
    overflow: hidden
`;

const getWidth = () => {
    const { innerWidth: width } = window;
    return width;
};

const MenuList = (props) => {
    const [width, setWidth] = useState(getWidth());

    useEffect(() => {
        function handleResize() {
            setWidth(getWidth());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const {
        options, children, maxHeight, getValue,
    } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * 50;

    const rows = Array.isArray(children) ? children : [];

    function rowRenderer({
        key, index, style,
    }) {
        return (
            <div
                key={key}
                style={style}
            >
                {rows[index]}
            </div>
        );
    }

    return (
        <StyledList
            height={maxHeight}
            width={width * 0.8}
            rowCount={rows.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
            itemCount={children.length}
            initialScrollOffset={initialOffset}
        >
            {({ index, style }) => <div style={style}>{children[index]}</div>}
        </StyledList>
    );
};

export default MenuList;
