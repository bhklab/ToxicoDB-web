import React, { PureComponent } from 'react';
import { List } from 'react-virtualized/dist/commonjs/List';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
// import _ from 'lodash';
// import { FixedSizeList as List } from "react-window";


const height = 50;

const StyledList = styled(List)`
    background: #fff;
`;

export default class MenuList extends PureComponent {
    // render() {
    //     const { options, children, maxHeight, getValue } = this.props;
    //     const [value] = getValue();
    //     const initialOffset = options.indexOf(value) * ITEM_HEIGHT;

    //     function getOptionSize (option) {
    //         if (option.options) {
    //         return option.options.length * ITEM_HEIGHT + GROUP_HEADER_HEIGHT;
    //         }
    //         return ITEM_HEIGHT;
    //     }

    //     function getItemSize (i) {
    //         return getOptionSize(options[i]);
    //     }

    //     const totalHeight = options.reduce((height, option) => {
    //         return height + getOptionSize(option);
    //     }, 0);

    //     const estimatedItemSize = totalHeight / options.length;

    //     return (
    //         <List
    //         height={Math.min(totalHeight, 300)}
    //         itemCount={children.length}
    //         itemSize={getItemSize}
    //         estimatedItemSize={estimatedItemSize}
    //         initialScrollOffset={initialOffset}
    //         >
    //         {({ index, style }) => <div style={style}>{children[index]}</div>}
    //         </List>
    //     );
    // }
    render() {
        const {
            options, children, maxHeight, getValue,
        } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        const rows = Array.isArray(children) ? children : [];

        function rowRenderer({ key, index, style }) {
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
            <AutoSizer>
                {({ height, width }) => (
                    <StyledList
                        height={maxHeight}
                        rowHeight={50}
                        itemCount={children.length}
                        itemSize={height}
                        rowRenderer={rowRenderer}
                        rowCount={rows.length}
                        initialScrollOffset={initialOffset}
                        width={width}
                    >
                        {({ index, style }) => <div style={style}>{children[index]}</div>}
                    </StyledList>
                )}
            </AutoSizer>
        );
    }
}
